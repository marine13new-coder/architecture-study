// 타임라인 뷰: 중심축 기반 생애/활동 연표 (Lifespan & Working Period Timeline Chart)

class ArchiTimeline {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.onSelectArchitect = options.onSelectArchitect || (() => {});
    
    this.architects = [];
    this.edges = [];
    this.eras = [];
    this.activeEraId = null;
    this.searchQuery = "";
    this.viewMode = "chart"; // 'chart' (연표 막대 뷰) | 'cards' (전통 카드 뷰)

    // 연표 차트 시간 스케일 상수 (수학적 1:1 절대 시간 좌표)
    this.START_YEAR = 1830;
    this.END_YEAR = 2026;
    this.TOTAL_YEARS = this.END_YEAR - this.START_YEAR;
    this.PX_PER_YEAR = 18; // 1년당 18px (완벽한 가독성)
    this.LEFT_OFFSET = 100; // 좌측 시작 여백
    this.LANE_HEIGHT = 32; // 레인 높이 (26px 바 + 6px 여백)
    this.AXIS_GAP = 32; // 중앙 축과 레인 사이 간격
    
    this.selectedArchitectId = null;
    this.dragBound = false;
  }

  // 절대 연도 -> X 픽셀 좌표 변환 단일 기준 공식 (Single Source of Truth)
  yearToX(year) {
    return this.LEFT_OFFSET + (year - this.START_YEAR) * this.PX_PER_YEAR;
  }

  setData(architects, edges, eras) {
    this.architects = architects;
    this.edges = edges;
    this.eras = eras;
    this.render();
  }

  setFilter(eraId) {
    this.activeEraId = eraId;
    this.render();
    if (this.viewMode === "cards" && eraId && eraId !== "all") {
      const eraEl = document.getElementById(`era-block-${eraId}`);
      if (eraEl) {
        eraEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (this.viewMode === "chart" && eraId && eraId !== "all") {
      const eraStartYears = {
        "era-pioneers": 1850,
        "era-masters": 1900,
        "era-postwar": 1945,
        "era-postmodern": 1970,
        "era-contemporary": 1995
      };
      const year = eraStartYears[eraId] || 1900;
      this.scrollToYear(year);
    }
  }

  setSearchQuery(query) {
    this.searchQuery = (query || "").trim().toLowerCase();
    this.render();
  }

  setZoom(pxPerYear) {
    this.PX_PER_YEAR = Math.max(10, Math.min(30, pxPerYear));
    this.render();
  }

  scrollToYear(year) {
    if (!this.container) return;
    const x = this.yearToX(year);
    this.container.scrollTo({ left: Math.max(0, x - 280), behavior: 'smooth' });
  }

  onActivate() {
    this.render();
    setTimeout(() => {
      if (this.viewMode === "chart" && this.currentAxisY && this.container) {
        // 중앙 시간축이 화면 정중앙에 오도록 수직 스크롤 정렬
        const targetScrollTop = Math.max(0, this.currentAxisY - (this.container.clientHeight / 2));
        this.container.scrollTop = targetScrollTop;
        // 1860년대(근대 건축의 태동기)가 시작 부분에 오도록 스크롤 정렬
        this.scrollToYear(1860);
      }
    }, 40);
  }

  // ========================================================
  // RENDER DISPATCHER
  // ========================================================
  render() {
    if (!this.container) return;

    if (this.viewMode === "chart") {
      this.renderLifespanChart();
    } else {
      this.renderTraditionalCards();
    }
  }

  // ========================================================
  // 1. 생애 및 활동 연표 차트 (Full-Span Tracks & 1:1 Time Precision)
  // ========================================================
  renderLifespanChart() {
    const totalWidth = this.LEFT_OFFSET + (this.TOTAL_YEARS * this.PX_PER_YEAR) + 140;
    const eraMap = {};
    this.eras.forEach(e => { eraMap[e.id] = e; });

    let list = this.architects.filter(a => {
      if (this.activeEraId && this.activeEraId !== "all" && a.eraId !== this.activeEraId) {
        return false;
      }
      if (this.searchQuery) {
        const q = this.searchQuery;
        return (
          a.nameKo.toLowerCase().includes(q) ||
          a.nameEn.toLowerCase().includes(q) ||
          a.movement.toLowerCase().includes(q) ||
          (a.country && a.country.toLowerCase().includes(q)) ||
          (a.masterpiece && a.masterpiece.toLowerCase().includes(q)) ||
          (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });

    const masterIds = ["frank-lloyd-wright", "le-corbusier", "ludwig-mies", "walter-gropius", "alvar-aalto"];
    const isMaster = (id) => masterIds.includes(id);

    // 4대 거장은 축에 가장 가까운 레인(0, 1)에 우선 배치되도록 정렬 후 출생순 정렬
    const sortedList = [...list].sort((a, b) => {
      const isMasterA = masterIds.includes(a.id);
      const isMasterB = masterIds.includes(b.id);
      if (isMasterA && !isMasterB) return -1;
      if (!isMasterA && isMasterB) return 1;
      return a.birth - b.birth;
    });

    // 절대 겹침 없는 무충돌 동적 레인 패킹 (실제 출생X ~ 사망X 전체 구간 기준)
    const aboveLanes = []; // 각 레인의 오른쪽 끝 점유 X 좌표
    const belowLanes = [];
    const GAP = 18; // 레인 내 막대 간 최소 픽셀 간격

    const placedBars = sortedList.map(arch => {
      const birth = arch.birth;
      const death = arch.death || 2026;
      const activeStart = Math.min(death, birth + 25);
      const master = isMaster(arch.id);

      const birthX = this.yearToX(birth);
      const deathX = this.yearToX(death);
      const barWidth = deathX - birthX;
      const barRight = deathX + GAP;

      let bestSide = 'above';
      let bestLane = -1;

      // 1. 위쪽 레인 중 들어갈 수 있는 가장 낮은 인덱스 탐색
      for (let l = 0; l < aboveLanes.length; l++) {
        if (birthX >= aboveLanes[l]) {
          bestLane = l;
          bestSide = 'above';
          break;
        }
      }

      // 2. 아래쪽 레인 중 들어갈 수 있는 가장 낮은 인덱스 탐색
      let bestBelowLane = -1;
      for (let l = 0; l < belowLanes.length; l++) {
        if (birthX >= belowLanes[l]) {
          bestBelowLane = l;
          break;
        }
      }

      // 3. 축에서 가장 가까운(lane index가 가장 작은) 방향 결정
      if (bestLane === -1 && bestBelowLane === -1) {
        if (aboveLanes.length <= belowLanes.length) {
          bestSide = 'above';
          bestLane = aboveLanes.length;
          aboveLanes.push(barRight);
        } else {
          bestSide = 'below';
          bestLane = belowLanes.length;
          belowLanes.push(barRight);
        }
      } else if (bestLane !== -1 && bestBelowLane !== -1) {
        if (bestLane <= bestBelowLane) {
          bestSide = 'above';
          aboveLanes[bestLane] = barRight;
        } else {
          bestSide = 'below';
          bestLane = bestBelowLane;
          belowLanes[bestBelowLane] = barRight;
        }
      } else if (bestLane !== -1) {
        bestSide = 'above';
        aboveLanes[bestLane] = barRight;
      } else {
        bestSide = 'below';
        bestLane = bestBelowLane;
        belowLanes[bestBelowLane] = barRight;
      }

      return {
        architect: arch,
        birth,
        death,
        activeStart,
        isMaster: master,
        side: bestSide,
        laneIndex: bestLane,
        birthX,
        deathX,
        barWidth
      };
    });

    const numAbove = Math.max(1, aboveLanes.length);
    const numBelow = Math.max(1, belowLanes.length);

    // 컴팩트 수직 좌표 계산
    const aboveBlockHeight = numAbove * this.LANE_HEIGHT;
    const axisY = aboveBlockHeight + this.AXIS_GAP + 24;
    const totalHeight = axisY + this.AXIS_GAP + (numBelow * this.LANE_HEIGHT) + 70;
    this.currentAxisY = axisY;

    // 10년 단위 눈금 생성 (1840 ~ 2020, 2026)
    const ticks = [];
    for (let yr = 1840; yr <= 2020; yr += 10) {
      ticks.push(yr);
    }
    ticks.push(2026);

    const eraBands = [
      { name: "태동기 & 근대 선구자", start: 1850, end: 1910, color: "#f59e0b" },
      { name: "근대 4대 거장 & 아방가르드", start: 1910, end: 1945, color: "#3b82f6" },
      { name: "전후 모더니즘 & 브루탈리즘", start: 1945, end: 1970, color: "#10b981" },
      { name: "포스트모더니즘 & 해체주의", start: 1970, end: 1995, color: "#ef4444" },
      { name: "하이테크 & 현대 동시대", start: 1995, end: 2026, color: "#8b5cf6" }
    ];

    const html = `
      <!-- Sticky Toolbar -->
      <div class="timeline-toolbar">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div class="timeline-mode-toggle">
            <button class="mode-btn ${this.viewMode === 'chart' ? 'active' : ''}" id="btn-mode-chart">
              <span>📊 생애·활동 연표 뷰</span>
            </button>
            <button class="mode-btn ${this.viewMode === 'cards' ? 'active' : ''}" id="btn-mode-cards">
              <span>🗂️ 시대별 카드 뷰</span>
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            <button class="btn" id="btn-jump-masters" title="근대 4대 거장 시대로 점프" style="padding: 4px 10px; font-size: 0.78rem;">
              <span>⭐ 4대 거장 시대로</span>
            </button>
            <button class="btn" id="btn-zoom-fit" title="한눈에 보기 (1860년 정렬)" style="padding: 4px 8px; font-size: 0.78rem;">
              <span>초기 정렬</span>
            </button>
            <button class="btn btn-icon" id="btn-timeline-zoom-in" title="시간축 확대" style="padding: 4px 8px;">
              <span>+</span>
            </button>
            <button class="btn btn-icon" id="btn-timeline-zoom-out" title="시간축 축소" style="padding: 4px 8px;">
              <span>-</span>
            </button>
          </div>
        </div>

        <div class="timeline-info-badge">
          <span>총 <strong>${list.length}</strong>인의 건축가 생애·활동 연표 (1830 ~ 2026)</span>
          <span style="opacity: 0.3;">|</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">
            [출생년도 | 이름 | ── 전성기 활동라인 ── | 사망/현재 (수명)] 이 시간축과 1:1로 정확하게 일치합니다.
          </span>
        </div>
      </div>

      <!-- Main Lifespan Chart View -->
      <div class="lifespan-chart-wrapper" id="lifespan-chart-canvas" style="width: ${totalWidth}px; height: ${totalHeight}px; min-height: ${totalHeight}px;">
        
        <!-- 1. Background Decade Grid Lines (10년 단위 세로 가이드라인) -->
        <div class="timeline-grid-lines">
          ${ticks.map(yr => {
            const x = this.yearToX(yr);
            const isMajor = yr % 50 === 0;
            return `
              <div class="grid-vertical-line ${isMajor ? 'major' : ''}" style="left: ${x}px;"></div>
            `;
          }).join("")}
        </div>

        <!-- 2. Era Background Color Bands -->
        <div class="era-background-bands">
          ${eraBands.map(b => {
            const left = this.yearToX(b.start);
            const width = (b.end - b.start) * this.PX_PER_YEAR;
            return `
              <div class="era-band" style="left: ${left}px; width: ${width}px; border-left-color: ${b.color};">
                <span class="era-band-label" style="color: ${b.color};">${b.name} (${b.start}–${b.end})</span>
              </div>
            `;
          }).join("")}
        </div>

        <!-- 3. Central Timeline Axis Line (중심 기준 시간선) -->
        <div class="central-axis-line" style="left: ${this.yearToX(1830)}px; width: ${(this.END_YEAR - this.START_YEAR) * this.PX_PER_YEAR}px; top: ${axisY}px;">
          <div class="axis-label-center">TIMELINE AXIS · 1830 – 2026</div>
        </div>

        <!-- 4. Year Ticks & Numbers on the Axis -->
        <div class="year-ticks-container" style="top: ${axisY - 8}px;">
          ${ticks.map(yr => {
            const x = this.yearToX(yr);
            const isMajor = yr % 20 === 0 || yr === 2026;
            return `
              <div class="year-tick" style="left: ${x}px;">
                <div class="year-tick-mark ${isMajor ? 'major' : ''}"></div>
                <div class="year-tick-text" style="${isMajor ? 'color: var(--text-primary); font-weight: 700;' : ''}">${yr}</div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- 5. Vertical Hover Probe Line -->
        <div class="timeline-probe-line" id="timeline-probe-line">
          <div class="probe-year-bubble" id="probe-year-bubble" style="top: ${axisY - 42}px;">1920</div>
        </div>

        <!-- 6. Lifespan Bars Layer (출생~사망 1:1 완벽 연계 트랙) -->
        <div class="lifespan-bars-layer">
          ${placedBars.map(bar => this.createLifespanBarHtml(bar, axisY, eraMap)).join("")}
        </div>

      </div>
    `;

    this.container.innerHTML = html;
    this.bindChartEvents(axisY);
  }

  createLifespanBarHtml(bar, axisY, eraMap) {
    const arch = bar.architect;
    const era = eraMap[arch.eraId] || { color: "#3b82f6" };
    
    const birthX = bar.birthX;
    const barWidth = bar.barWidth;
    
    // 본격 활동 전성기 구간 (만 25세 ~ 사망/현재)
    const activeStartX = this.yearToX(bar.activeStart);
    const activeLeft = activeStartX - birthX; // 막대 내부 시작 오프셋
    const activeWidth = Math.max(40, bar.deathX - activeStartX); // 전성기 활동 폭
    const activeYears = bar.death - bar.activeStart;

    // 수직 Y 좌표 계산
    let barTop, stemTop, stemHeight;

    if (bar.side === "above") {
      barTop = axisY - this.AXIS_GAP - ((bar.laneIndex + 1) * this.LANE_HEIGHT);
      stemTop = barTop + this.LANE_HEIGHT - 6;
      stemHeight = axisY - stemTop;
    } else {
      barTop = axisY + this.AXIS_GAP + (bar.laneIndex * this.LANE_HEIGHT) + 6;
      stemTop = axisY;
      stemHeight = barTop - axisY;
    }

    const age = bar.death - bar.birth;
    const lifespanText = arch.death ? `${bar.birth}–${bar.death} (향년 ${age}세)` : `${bar.birth}–현재 (${age}세)`;

    return `
      <!-- Connecting Stem to Central Axis (출생년도 기준 수직선) -->
      <div class="axis-connecting-stem" 
           style="left: ${birthX}px; top: ${stemTop}px; height: ${stemHeight}px; border-left: 1.5px dashed ${era.color}; opacity: 0.4;">
      </div>
      <div class="stem-birth-dot" 
           style="left: ${birthX}px; top: ${axisY}px; background: ${era.color}; border: 2px solid var(--bg-primary);" 
           title="${arch.nameKo} 출생년도: ${bar.birth}년">
      </div>

      <!-- Lifespan Full-Span Track Group -->
      <div class="architect-bar-group" 
           id="arch-bar-${arch.id}"
           data-id="${arch.id}" 
           style="left: ${birthX}px; top: ${barTop}px; width: ${barWidth}px;"
           title="${arch.nameKo} (${arch.nameEn})&#10;생애: ${lifespanText}&#10;본격 활동기: ${bar.activeStart}년 ~ ${bar.death}년 (${activeYears}년간 활동)&#10;대표작: ${arch.masterpiece}">
        
        <div class="lifespan-track" style="border-color: ${era.color}; ${bar.isMaster ? 'box-shadow: 0 0 12px rgba(59, 130, 246, 0.5); border-width: 2px;' : ''}">
          
          <!-- 1. Left Start Cap: 출생년도 뱃지 -->
          <div class="track-birth-badge" style="background: ${era.color};">
            <span>${bar.birth}</span>
          </div>

          <!-- 2. Identity: 마스터 스타 + 사진 + 이름 -->
          <div class="track-identity">
            ${bar.isMaster ? `<span class="track-master-star" title="근대 4대 거장">★</span>` : ''}
            ${arch.portraitImg ? `<img src="${arch.portraitImg}" class="track-avatar" loading="lazy" onerror="this.style.display='none'">` : ''}
            <span class="track-name">${arch.nameKo}</span>
          </div>

          <!-- 3. Active Working Span: 이름 뒤로 쭉 이어지는 전성기 활동 하이라이트 라인 -->
          <div class="track-active-span" 
               style="left: ${activeLeft}px; width: ${activeWidth}px; background: ${era.color};"
               title="본격 활동기: ${bar.activeStart}년 ~ ${bar.death}년">
            <span class="active-span-label">
              활동기 ${bar.activeStart} ~ ${bar.death} (${activeYears}년)
            </span>
          </div>

          <!-- 4. Right End Cap: 사망년도(또는 현재) & 나이 뱃지 -->
          <div class="track-death-badge">
            <span class="track-death-year">${arch.death ? arch.death + '년' : '현재'}</span>
            <span class="track-age">(${age}세)</span>
          </div>

        </div>
      </div>
    `;
  }

  // ========================================================
  // 2. 전통 카드 뷰
  // ========================================================
  renderTraditionalCards() {
    let filteredList = this.architects;
    if (this.searchQuery) {
      filteredList = filteredList.filter(a => {
        const query = this.searchQuery;
        return (
          a.nameKo.toLowerCase().includes(query) ||
          a.nameEn.toLowerCase().includes(query) ||
          a.movement.toLowerCase().includes(query) ||
          (a.country && a.country.toLowerCase().includes(query)) ||
          (a.masterpiece && a.masterpiece.toLowerCase().includes(query)) ||
          (a.tags && a.tags.some(t => t.toLowerCase().includes(query)))
        );
      });
    }

    const erasToDisplay = this.activeEraId && this.activeEraId !== "all"
      ? this.eras.filter(e => e.id === this.activeEraId)
      : this.eras;

    const html = `
      <div class="timeline-toolbar">
        <div class="timeline-mode-toggle">
          <button class="mode-btn ${this.viewMode === 'chart' ? 'active' : ''}" id="btn-mode-chart">
            <span>📊 생애·활동 연표 뷰</span>
          </button>
          <button class="mode-btn ${this.viewMode === 'cards' ? 'active' : ''}" id="btn-mode-cards">
            <span>🗂️ 시대별 카드 뷰</span>
          </button>
        </div>

        <div class="timeline-info-badge">
          <span>시대별 카드 아카이브 뷰</span>
        </div>
      </div>

      <div class="timeline-traditional-view">
        <div class="timeline-canvas">
          ${erasToDisplay.map(era => {
            const eraArchitects = filteredList
              .filter(a => a.eraId === era.id)
              .sort((a, b) => a.birth - b.birth);

            if (this.searchQuery && eraArchitects.length === 0) return "";

            return `
              <div class="timeline-era-block" id="era-block-${era.id}">
                <div class="timeline-era-header">
                  <span class="timeline-era-badge" style="background-color: ${era.color};">${era.period}</span>
                  <h3 class="timeline-era-title">${era.name}</h3>
                  <p class="timeline-era-desc">${era.desc}</p>
                </div>

                ${eraArchitects.length === 0 
                  ? `<div style="color: var(--text-muted); padding: 20px 0; font-size: 0.9rem;">검색 결과와 일치하는 건축가가 없습니다.</div>`
                  : `
                    <div class="timeline-grid">
                      ${eraArchitects.map(arch => this.createCardHtml(arch, era)).join("")}
                    </div>
                  `
                }
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.bindCardEvents();
  }

  createCardHtml(arch, era) {
    const isMaster = ["frank-lloyd-wright", "le-corbusier", "ludwig-mies", "walter-gropius", "alvar-aalto"].includes(arch.id);
    const lifespan = arch.death ? `${arch.birth} – ${arch.death}` : `${arch.birth} – 현재`;

    return `
      <div class="timeline-card" data-id="${arch.id}" style="border-left-color: ${era.color};">
        <div>
          <div class="card-top">
            <div>
              <div class="architect-name-ko">
                ${arch.nameKo}
                ${isMaster ? `<span style="font-size: 0.7rem; background: #2563eb; color: #fff; padding: 2px 6px; border-radius: 4px; margin-left: 6px; font-weight: 600;">근대 4대거장</span>` : ''}
              </div>
              <div class="architect-name-en">${arch.nameEn} · ${arch.country}</div>
            </div>
            <span class="lifespan-badge">${lifespan}</span>
          </div>

          <div class="architect-movement">${arch.movement}</div>

          ${arch.quote ? `<div class="architect-quote">"${arch.quote}"</div>` : ''}

          ${arch.masterpiece ? `
            <div class="architect-masterpiece">
              <span style="color: var(--text-muted); font-size: 0.72rem; font-weight: 700;">대표작</span>
              <span>${arch.masterpiece}</span>
            </div>
          ` : ''}
        </div>

        <div class="card-bottom-tags">
          ${(arch.tags || []).slice(0, 3).map(tag => `<span class="tag-pill">#${tag}</span>`).join("")}
          <div class="genealogy-indicator">
            <span>자세히 보기 →</span>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================
  // EVENT BINDINGS
  // ========================================================
  bindChartEvents(axisY) {
    const btnChart = document.getElementById("btn-mode-chart");
    const btnCards = document.getElementById("btn-mode-cards");
    const btnJumpMasters = document.getElementById("btn-jump-masters");
    const btnZoomFit = document.getElementById("btn-zoom-fit");
    const btnZoomIn = document.getElementById("btn-timeline-zoom-in");
    const btnZoomOut = document.getElementById("btn-timeline-zoom-out");

    if (btnChart) {
      btnChart.addEventListener("click", () => {
        this.viewMode = "chart";
        this.render();
      });
    }
    if (btnCards) {
      btnCards.addEventListener("click", () => {
        this.viewMode = "cards";
        this.render();
      });
    }
    if (btnJumpMasters) {
      btnJumpMasters.addEventListener("click", () => {
        this.scrollToYear(1885);
      });
    }
    if (btnZoomFit) {
      btnZoomFit.addEventListener("click", () => {
        this.scrollToYear(1860);
      });
    }
    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", () => {
        this.setZoom(this.PX_PER_YEAR + 3);
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", () => {
        this.setZoom(this.PX_PER_YEAR - 3);
      });
    }

    // Architect Bar Click -> Open Detail Drawer
    const bars = this.container.querySelectorAll(".architect-bar-group");
    bars.forEach(bar => {
      bar.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = bar.getAttribute("data-id");
        const arch = this.architects.find(a => a.id === id);
        if (arch) {
          this.highlightConnectedBars(id);
          this.onSelectArchitect(arch);
        }
      });
    });

    // Vertical Probe Line on Mouse Move
    const canvas = document.getElementById("lifespan-chart-canvas");
    const probeLine = document.getElementById("timeline-probe-line");
    const probeBubble = document.getElementById("probe-year-bubble");

    if (canvas && probeLine && probeBubble) {
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const relativeX = x - this.LEFT_OFFSET;
        const year = Math.round(this.START_YEAR + (relativeX / this.PX_PER_YEAR));

        if (year >= this.START_YEAR && year <= this.END_YEAR) {
          probeLine.style.display = "block";
          probeLine.style.left = `${x}px`;
          probeBubble.textContent = `${year}년`;
        } else {
          probeLine.style.display = "none";
        }
      });

      canvas.addEventListener("mouseleave", () => {
        probeLine.style.display = "none";
      });

      canvas.addEventListener("click", () => {
        this.clearBarHighlights();
      });
    }

    // 마우스 드래그 상하좌우 2D 팬(Pan) 등록 (중복 방지)
    if (!this.dragBound && this.container) {
      this.dragBound = true;
      let isDown = false;
      let startX, startY;
      let scrollLeft, scrollTop;

      this.container.addEventListener("mousedown", (e) => {
        if (e.target.closest(".architect-bar-group") || e.target.closest("button") || e.target.closest("input")) return;
        isDown = true;
        startX = e.pageX - this.container.offsetLeft;
        startY = e.pageY - this.container.offsetTop;
        scrollLeft = this.container.scrollLeft;
        scrollTop = this.container.scrollTop;
      });

      window.addEventListener("mouseup", () => { isDown = false; });

      this.container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const x = e.pageX - this.container.offsetLeft;
        const y = e.pageY - this.container.offsetTop;
        const walkX = (x - startX) * 1.3;
        const walkY = (y - startY) * 1.3;
        this.container.scrollLeft = scrollLeft - walkX;
        this.container.scrollTop = scrollTop - walkY;
      });
    }
  }

  bindCardEvents() {
    const btnChart = document.getElementById("btn-mode-chart");
    const btnCards = document.getElementById("btn-mode-cards");

    if (btnChart) {
      btnChart.addEventListener("click", () => {
        this.viewMode = "chart";
        this.render();
      });
    }
    if (btnCards) {
      btnCards.addEventListener("click", () => {
        this.viewMode = "cards";
        this.render();
      });
    }

    const cards = this.container.querySelectorAll(".timeline-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const arch = this.architects.find(a => a.id === id);
        if (arch) {
          this.onSelectArchitect(arch);
        }
      });
    });
  }

  highlightConnectedBars(selectedId) {
    this.selectedArchitectId = selectedId;
    const connectedIds = new Set([selectedId]);

    this.edges.forEach(edge => {
      const sourceId = typeof edge.source === "object" ? edge.source.id : edge.source;
      const targetId = typeof edge.target === "object" ? edge.target.id : edge.target;

      if (sourceId === selectedId) connectedIds.add(targetId);
      if (targetId === selectedId) connectedIds.add(sourceId);
    });

    const bars = this.container.querySelectorAll(".architect-bar-group");
    bars.forEach(bar => {
      const id = bar.getAttribute("data-id");
      if (connectedIds.has(id)) {
        bar.classList.remove("dimmed");
        bar.classList.add("highlighted");
      } else {
        bar.classList.add("dimmed");
        bar.classList.remove("highlighted");
      }
    });
  }

  clearBarHighlights() {
    this.selectedArchitectId = null;
    const bars = this.container.querySelectorAll(".architect-bar-group");
    bars.forEach(bar => {
      bar.classList.remove("dimmed");
      bar.classList.remove("highlighted");
    });
  }
}

window.ArchiTimeline = ArchiTimeline;
