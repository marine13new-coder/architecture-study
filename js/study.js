// ========================================================
// ARCHI-STUDY: Advanced Architectural Education & Tools
// 1. 4대 거장 비교 연구 매트릭스 (Masters Comparative Matrix)
// 2. 1:1 건축가 맞비교 분석기 (Side-by-Side Architect Comparator)
// 3. 근현대 건축 사조 & 매니페스토 가이드 (Movements Guide)
// 4. 건축 공간 & 기술 핵심 용어 사전 (Architectural Glossary)
// 5. 고해상도 도면 돋보기 & 다이어그램 라이트박스 (Blueprint Lightbox)
// 6. 건축사 자가진단 퀴즈 & 플래시카드 (Interactive Quiz)
// 7. 시험 대비 수험 요약집 인쇄 / 마크다운 내보내기 (Study Exporter)
// ========================================================

class ArchiStudy {
  constructor(app) {
    this.app = app;
    this.architects = app.architects || [];
    this.quizState = {
      score: 0,
      total: 0,
      streak: 0,
      currentQuestion: null,
      mode: 'visual' // 'visual' | 'quote' | 'genealogy'
    };

    this.lightboxState = {
      zoom: 1,
      panX: 0,
      panY: 0,
      isDragging: false,
      startX: 0,
      startY: 0
    };

    this.comparatorState = {
      idA: 'le-corbusier',
      idB: 'ludwig-mies'
    };

    this.init();
  }

  init() {
    this.setupButtons();
    this.setupModals();
    this.setupLightboxEvents();
  }

  updateData(architects) {
    this.architects = architects;
  }

  setupButtons() {
    // 1. 4대 거장 비교
    const btnMatrix = document.getElementById('btn-open-masters-matrix');
    if (btnMatrix) btnMatrix.addEventListener('click', () => this.openMastersMatrix());

    // 2. 1:1 맞비교 분석기
    const btnCompare = document.getElementById('btn-open-comparator');
    if (btnCompare) btnCompare.addEventListener('click', () => this.openComparator());

    // 3. 사조 가이드
    const btnMovements = document.getElementById('btn-open-movements-guide');
    if (btnMovements) btnMovements.addEventListener('click', () => this.openMovementsGuide());

    // 4. 용어 사전
    const btnGlossary = document.getElementById('btn-open-glossary');
    if (btnGlossary) btnGlossary.addEventListener('click', () => this.openGlossary());

    // 5. 건축사 퀴즈
    const btnQuiz = document.getElementById('btn-open-quiz-modal');
    if (btnQuiz) btnQuiz.addEventListener('click', () => this.openQuizModal());

    // 6. 수험 요약집 내보내기
    const btnExport = document.getElementById('btn-open-study-export');
    if (btnExport) btnExport.addEventListener('click', () => this.openStudyExporter());
  }

  setupModals() {
    // Modal Close Buttons
    document.querySelectorAll('.study-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('open');
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.study-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });

    // ESC key closes all modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAllModals();
    });
  }

  closeAllModals() {
    document.querySelectorAll('.study-modal').forEach(m => m.classList.remove('open'));
  }

  getArchitectName(id) {
    const a = this.architects.find(x => x.id === id);
    return a ? a.nameKo : id;
  }

  // ========================================================
  // 1. 근대 4대 거장 비교 연구 매트릭스 (Masters Comparative Matrix)
  // ========================================================
  openMastersMatrix() {
    this.closeAllModals();
    const modal = document.getElementById('modal-masters-matrix');
    if (!modal) return;

    const mastersIds = ['frank-lloyd-wright', 'le-corbusier', 'ludwig-mies', 'walter-gropius', 'alvar-aalto'];
    const masters = mastersIds.map(id => this.architects.find(a => a.id === id)).filter(Boolean);

    const container = document.getElementById('masters-matrix-container');
    if (container) {
      container.innerHTML = `
        <div class="matrix-table-wrapper">
          <table class="masters-comparison-table">
            <thead>
              <tr>
                <th class="matrix-sticky-col">비교 기준</th>
                ${masters.map(m => `
                  <th class="matrix-architect-th" data-id="${m.id}">
                    <div class="matrix-th-card jump-architect-btn" data-id="${m.id}" title="상세 도감 열기">
                      <img src="${m.portraitImg}" class="matrix-th-avatar" alt="${m.nameKo}" loading="lazy">
                      <div class="matrix-th-name">${m.nameKo}</div>
                      <div class="matrix-th-en">${m.nameEn.split('(')[0]}</div>
                      <span class="matrix-th-lifespan">${m.birth} – ${m.death}</span>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="matrix-row-label">핵심 슬로건 & 선언문</td>
                ${masters.map(m => `
                  <td class="matrix-cell">
                    <div class="matrix-quote">"${m.quote}"</div>
                    <div class="matrix-movement">${m.movement}</div>
                  </td>
                `).join('')}
              </tr>

              <tr>
                <td class="matrix-row-label">대표 공간 개념</td>
                <td class="matrix-cell">
                  <strong>상자의 파괴 (Destruction of the Box)</strong><br>
                  방과 방을 가두던 닫힌 벽체를 허물고, 중심 벽난로를 축으로 사방으로 확장되는 유기적 수평 평면.
                </td>
                <td class="matrix-cell">
                  <strong>근대 5원칙 & 돔이노</strong><br>
                  필로티로 지상에서 띄운 순백의 상자, 옥상정원, 구조로부터 해방된 자유로운 평면과 가로로 긴 창.
                </td>
                <td class="matrix-cell">
                  <strong>만능 공간 (Universal Space)</strong><br>
                  어떠한 내부 기둥도 없이 가변적인 칸막이만으로 모든 기능을 수용하는 궁극의 열린 무주 공간.
                </td>
                <td class="matrix-cell">
                  <strong>풍차형 동적 순환 공간</strong><br>
                  공방, 기숙사, 강의동이 풍차 날개처럼 뻗어나가 어떤 방향에서도 단일 정면이 없는 입체 조형.
                </td>
                <td class="matrix-cell">
                  <strong>인간주의 유기적 기능주의</strong><br>
                  기계적 직각을 탈피하여 환자의 온기, 핀란드의 호수와 숲을 닮은 부드러운 곡면과 자연 채광의 결합.
                </td>
              </tr>

              <tr>
                <td class="matrix-row-label">구조 시스템 & 핵심 재료</td>
                <td class="matrix-cell">
                  철근 콘크리트 캔틸레버(외팔보) 트레이, 로마 벽돌 줄눈, 자연 사암, 목재 마감의 일체화.
                </td>
                <td class="matrix-cell">
                  철근 콘크리트 골조(Béton Armé), 모듈러(인체 황금비), 후기 거친 노출 콘크리트(Béton Brut).
                </td>
                <td class="matrix-cell">
                  외벽 노출 강철 H/I-빔, 크롬 도금 십자형 기둥, 청동 멀리언, 대형 투명 판유리, 트래버틴 대리석.
                </td>
                <td class="matrix-cell">
                  철골 트러스 구조, 세계 최초의 전면 유리 커튼월(Curtain Wall), 공업화 표준 대량생산 부품.
                </td>
                <td class="matrix-cell">
                  열간 굴곡 성형 자작나무 합판, 적벽돌, 천창 랜턴을 통한 간접 확산 자연광, 구리판 피복.
                </td>
              </tr>

              <tr>
                <td class="matrix-row-label">3대 기념비적 걸작</td>
                <td class="matrix-cell">
                  <ul class="matrix-works-list">
                    <li>🏛️ <strong>낙수원</strong> (1935, 펜실베이니아)</li>
                    <li>🏛️ <strong>구겐하임 미술관</strong> (1959, 뉴욕)</li>
                    <li>🏛️ <strong>로비 하우스</strong> (1910, 시카고)</li>
                  </ul>
                </td>
                <td class="matrix-cell">
                  <ul class="matrix-works-list">
                    <li>🏛️ <strong>빌라 사보아</strong> (1931, 푸아시)</li>
                    <li>🏛️ <strong>롱샹 순례 성당</strong> (1955, 롱샹)</li>
                    <li>🏛️ <strong>위니테 다비타시옹</strong> (1952, 마르세유)</li>
                  </ul>
                </td>
                <td class="matrix-cell">
                  <ul class="matrix-works-list">
                    <li>🏛️ <strong>바르셀로나 파빌리온</strong> (1929, 바르셀로나)</li>
                    <li>🏛️ <strong>시그램 빌딩</strong> (1958, 뉴욕)</li>
                    <li>🏛️ <strong>판스워스 주택</strong> (1951, 일리노이)</li>
                  </ul>
                </td>
                <td class="matrix-cell">
                  <ul class="matrix-works-list">
                    <li>🏛️ <strong>데사우 바우하우스</strong> (1926, 데사우)</li>
                    <li>🏛️ <strong>파구스 제화공장</strong> (1911, 알펠트)</li>
                    <li>🏛️ <strong>팬암 빌딩</strong> (1963, 뉴욕)</li>
                  </ul>
                </td>
                <td class="matrix-cell">
                  <ul class="matrix-works-list">
                    <li>🏛️ <strong>파이미오 요양원</strong> (1933, 파이미오)</li>
                    <li>🏛️ <strong>빌라 마이레아</strong> (1939, 노르마르쿠)</li>
                    <li>🏛️ <strong>세이나요키 시민센터</strong> (1965)</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td class="matrix-row-label">대표 저서 & 선언문</td>
                <td class="matrix-cell">『유기적 건축론』, 『미래의 건축』</td>
                <td class="matrix-cell">『건축을 향하여 (1923)』, 『도시계획』, 『모듈러』</td>
                <td class="matrix-cell">『건축에 대하여』, IIT 취임 연설문</td>
                <td class="matrix-cell">『바우하우스 창립 선언문 (1919)』, 『새로운 건축과 바우하우스』</td>
                <td class="matrix-cell">『인간 중심의 건축』</td>
              </tr>

              <tr>
                <td class="matrix-row-label">사제 관계 & 후대 계보</td>
                ${masters.map(m => `
                  <td class="matrix-cell">
                    <div class="matrix-relations">
                      <div class="matrix-rel-group">
                        <span class="rel-label">스승:</span>
                        ${(m.influencedBy || []).map(id => `<span class="relation-mini-pill jump-architect-btn" data-id="${id}">${this.getArchitectName(id)}</span>`).join('') || '<span class="text-muted">독자적</span>'}
                      </div>
                      <div class="matrix-rel-group" style="margin-top: 4px;">
                        <span class="rel-label">제자:</span>
                        ${(m.influences || []).map(id => `<span class="relation-mini-pill jump-architect-btn" data-id="${id}">${this.getArchitectName(id)}</span>`).join('') || '<span class="text-muted">직접 제자 없음</span>'}
                      </div>
                    </div>
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // Jump to architect in drawer
      container.querySelectorAll('.jump-architect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const arch = this.architects.find(a => a.id === id);
          if (arch) {
            modal.classList.remove('open');
            this.app.openDetailDrawer(arch);
          }
        });
      });
    }

    modal.classList.add('open');
  }

  // ========================================================
  // 2. 1:1 건축가 맞비교 분석기 (Side-by-Side Architect Comparator)
  // ========================================================
  openComparator(defaultA, defaultB) {
    this.closeAllModals();
    const modal = document.getElementById('modal-comparator');
    if (!modal) return;

    if (defaultA) this.comparatorState.idA = defaultA;
    if (defaultB) this.comparatorState.idB = defaultB;

    this.renderComparator();
    modal.classList.add('open');
  }

  renderComparator() {
    const container = document.getElementById('comparator-container');
    if (!container) return;

    const archA = this.architects.find(a => a.id === this.comparatorState.idA) || this.architects[0];
    const archB = this.architects.find(a => a.id === this.comparatorState.idB) || this.architects[1];

    const presets = [
      { label: "근대 2대 거인: 르 코르뷔지에 vs 미스", a: "le-corbusier", b: "ludwig-mies" },
      { label: "한국 현대건축 양대산맥: 김수근 vs 김중업", a: "kim-swoo-geun", b: "kim-chung-up" },
      { label: "유기적 vs 기계주의: 라이트 vs 코르뷔지에", a: "frank-lloyd-wright", b: "le-corbusier" },
      { label: "해체주의의 두 거인: 렘 콜하스 vs 자하 하디드", a: "rem-koolhaas", b: "zaha-hadid" },
      { label: "일본 현대건축의 거장: 단게 겐조 vs 안도 타다오", a: "kenzo-tange", b: "tadao-ando" },
      { label: "하이테크의 두 기수: 노먼 포스터 vs 렌조 피아노", a: "norman-foster", b: "renzo-piano" }
    ];

    container.innerHTML = `
      <div class="comparator-wrapper">
        <!-- Preset Buttons -->
        <div class="comparator-presets">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted);">대표 비교 프리셋:</span>
          ${presets.map(p => `
            <button class="preset-pill-btn ${p.a === archA.id && p.b === archB.id ? 'active' : ''}" data-a="${p.a}" data-b="${p.b}">
              ${p.label}
            </button>
          `).join('')}
        </div>

        <!-- Selectors Header -->
        <div class="comparator-header-selectors">
          <div class="comp-selector-box">
            <label class="comp-label">건축가 A 선택:</label>
            <select class="form-control" id="select-arch-a">
              ${this.architects.map(a => `<option value="${a.id}" ${a.id === archA.id ? 'selected' : ''}>[${a.birth}] ${a.nameKo} (${a.nameEn})</option>`).join('')}
            </select>
          </div>
          <div class="comp-vs-badge">VS</div>
          <div class="comp-selector-box">
            <label class="comp-label">건축가 B 선택:</label>
            <select class="form-control" id="select-arch-b">
              ${this.architects.map(a => `<option value="${a.id}" ${a.id === archB.id ? 'selected' : ''}>[${a.birth}] ${a.nameKo} (${a.nameEn})</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Comparison Columns Grid -->
        <div class="comparator-grid">
          ${[archA, archB].map((arch, idx) => `
            <div class="comp-column ${idx === 0 ? 'col-a' : 'col-b'}">
              <div class="comp-profile-header">
                <img src="${arch.portraitImg}" class="comp-avatar" alt="${arch.nameKo}">
                <div>
                  <h3 class="comp-name">${arch.nameKo}</h3>
                  <div class="comp-en">${arch.nameEn} · ${arch.country}</div>
                  <div class="comp-lifespan">${arch.birth} – ${arch.death || '현재'} (활동기 ${arch.birth + 25}~)</div>
                </div>
              </div>

              <!-- Media Showcase -->
              <div class="comp-section">
                <div class="comp-section-title">🏛️ 대표 건축물</div>
                <div class="comp-img-box">
                  <img src="${arch.buildingImg}" alt="${arch.masterpiece}" class="comp-work-img">
                  <span class="comp-img-caption">${arch.masterpiece}</span>
                </div>
              </div>

              <div class="comp-section">
                <div class="comp-section-title">📐 실제 설계 도면 / 평면도</div>
                <div class="comp-img-box blueprint-box" data-id="${arch.id}" title="클릭하여 고해상도 돋보기로 보기">
                  <img src="${arch.blueprintImg}" alt="Blueprint" class="comp-work-img">
                  <span class="comp-img-caption">🔍 ${arch.blueprintType || '설계 도면'} (클릭 시 돋보기)</span>
                </div>
              </div>

              <!-- Philosophy & Slogan -->
              <div class="comp-section">
                <div class="comp-section-title">💬 핵심 슬로건 & 건축 철학</div>
                <div class="comp-quote">"${arch.quote}"</div>
                <p class="comp-desc">${arch.desc}</p>
              </div>

              <!-- Keywords -->
              <div class="comp-section">
                <div class="comp-section-title">🔑 핵심 개념 키워드</div>
                <div class="comp-tags">
                  ${(arch.philosophyKeywords || []).map(k => `<span class="tag-pill">#${k}</span>`).join('')}
                </div>
              </div>

              <!-- Canonical Works -->
              <div class="comp-section">
                <div class="comp-section-title">📚 주요 걸작 분석</div>
                <div class="comp-works-list">
                  ${(arch.keyWorks || []).map(w => `
                    <div class="comp-work-card">
                      <div class="comp-work-head">
                        <strong>${w.name}</strong>
                        <span>${w.year ? w.year + '년' : ''} · ${w.location || ''}</span>
                      </div>
                      <div class="comp-work-body">${w.desc}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Anecdote -->
              <div class="comp-section">
                <div class="comp-section-title">💡 역사적 비화 & 학술 평가</div>
                <div class="comp-anecdote">${arch.anecdote}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Event listeners for selectors
    const selectA = document.getElementById('select-arch-a');
    const selectB = document.getElementById('select-arch-b');

    if (selectA) {
      selectA.addEventListener('change', (e) => {
        this.comparatorState.idA = e.target.value;
        this.renderComparator();
      });
    }
    if (selectB) {
      selectB.addEventListener('change', (e) => {
        this.comparatorState.idB = e.target.value;
        this.renderComparator();
      });
    }

    // Preset pills
    container.querySelectorAll('.preset-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.comparatorState.idA = btn.getAttribute('data-a');
        this.comparatorState.idB = btn.getAttribute('data-b');
        this.renderComparator();
      });
    });

    // Blueprint click to open lightbox
    container.querySelectorAll('.blueprint-box').forEach(box => {
      box.addEventListener('click', () => {
        const id = box.getAttribute('data-id');
        const arch = this.architects.find(a => a.id === id);
        if (arch) {
          this.openBlueprint(arch, arch.blueprintImg, `${arch.nameKo} - ${arch.blueprintType || '설계 도면'}`, arch.blueprintType, arch.blueprintDesc);
        }
      });
    });
  }

  // ========================================================
  // 3. 근현대 건축 사조 & 매니페스토 가이드 (Movements Guide)
  // ========================================================
  openMovementsGuide() {
    this.closeAllModals();
    const modal = document.getElementById('modal-movements-guide');
    if (!modal) return;

    const movements = [
      {
        name: "미술공예운동 (Arts & Crafts Movement)",
        period: "1850s – 1900s",
        center: "영국 런던",
        slogan: "유용하지 않거나 아름답지 않은 것은 집에 두지 마라.",
        desc: "산업혁명의 조잡한 기계 대량생산과 노동 소외에 반발하여 중세 길드의 수공예와 장인정신, 재료의 진실성을 부활시키고자 한 근대 디자인의 사상적 시초.",
        architects: ["william-morris", "henry-richardson"],
        masterpiece: "붉은 집 (Red House, 1859)",
        keywords: ["수공예 부활", "토탈 디자인", "노동의 가치 회복", "자연 모티브"]
      },
      {
        name: "시카고파 (Chicago School)",
        period: "1880s – 1900s",
        center: "미국 시카고",
        slogan: "형태는 기능을 따른다 (Form follows function).",
        desc: "1871년 시카고 대화재 이후 내화 강철 골조와 안전 엘리베이터 기술을 최초로 미학적 질서로 완성하여 근대 고층 마천루의 시대를 연 역사적 학파.",
        architects: ["louis-sullivan", "henry-richardson"],
        masterpiece: "웨인라이트 빌딩 (1891), 카슨 피리 스콧 백화점",
        keywords: ["마천루의 기원", "강철 골조", "3분할 입면 체계", "형태는 기능을 따른다"]
      },
      {
        name: "아르누보 (Art Nouveau)",
        period: "1890s – 1910s",
        center: "벨기에 브뤼셀, 프랑스 파리, 카탈루냐",
        slogan: "철과 유리는 식물처럼 유연하게 피어나는 공간의 꽃이다.",
        desc: "과거 그리스·로마의 낡은 역사주의 양식을 완전히 폐기하고, 식물의 줄기와 덩굴손에서 추출한 유기적 곡선(휘플래시 라인)과 주철 구조를 일체화시킨 신예술 운동.",
        architects: ["victor-horta", "antoni-gaudi"],
        masterpiece: "타셀 저택 (1893), 사그라다 파밀리아, 카사 밀라",
        keywords: ["휘플래시 곡선", "주철 유기 구조", "빛의 계단실", "트렌카디스 타일"]
      },
      {
        name: "빈 분리파 (Vienna Secession)",
        period: "1897 – 1910s",
        center: "오스트리아 빈",
        slogan: "시대에는 그 시대의 예술을, 예술에는 자유를.",
        desc: "보수적인 빈 아카데미의 역사주의 복고 양식에서 탈퇴(분리)하여, 신소재의 구조적 정직성과 기하학적 평면성을 강조하며 기능주의 모더니즘의 가교 역할을 한 운동.",
        architects: ["otto-wagner", "adolf-loos"],
        masterpiece: "빈 우편저금국 (1906), 로스하우스 (1910)",
        keywords: ["피복 이론", "알루미늄 볼트 노출", "장식은 죄악이다", "라움플란"]
      },
      {
        name: "독일 공작연맹 (Deutscher Werkbund)",
        period: "1907 – 1934",
        center: "독일 뮌헨 / 베를린",
        slogan: "형태는 시대정신(Zeitgeist)의 기술과 산업력에서 도출되어야 한다.",
        desc: "예술가와 산업 기업가를 규합하여 독일 공업 생산품의 규격화와 품질 고급화를 달성하고자 설립된 단체. 베렌스의 AEG 터빈 공장과 바이센호프 주거단지를 통해 바우하우스의 직접적 모태가 됨.",
        architects: ["peter-behrens", "walter-gropius", "ludwig-mies"],
        masterpiece: "AEG 터빈 공장 (1909), 슈투트가르트 바이센호프 주거단지 (1927)",
        keywords: ["기업 시각 아이덴티티(CI)", "산업 제품의 예술화", "표준화 논쟁", "근대 3대 거장의 요람"]
      },
      {
        name: "바우하우스 (Bauhaus)",
        period: "1919 – 1933",
        center: "독일 바이마르 ➔ 데사우 ➔ 베를린",
        slogan: "모든 조형 예술의 궁극적 목표는 건축이다! 예술과 기술의 새로운 통합.",
        desc: "20세기 전 세계 디자인과 건축의 문법을 바꾼 역사상 가장 위대한 종합 조형 예술 학교. 수공예 공방 훈련과 기계 대량생산 표준화를 결합하여 현대 타이포그래피, 가구, 건축의 표준을 창조함.",
        architects: ["walter-gropius", "marcel-breuer", "ludwig-mies"],
        masterpiece: "데사우 바우하우스 교사 (1926), 바실리 의자, 파구스 공장",
        keywords: ["전면 유리 커튼월", "튜뷸러 스틸 가구", "기초 조형 교육", "팀워크"]
      },
      {
        name: "데 스틸 (De Stijl / 신조형주의)",
        period: "1917 – 1931",
        center: "네덜란드 라이덴 / 위트레흐트",
        slogan: "3원색과 선, 면의 비대칭적 균형으로 순수한 보편성을 창조한다.",
        desc: "피에트 몬드리안과 테오 반 되스부르크, 리트벨트가 이끈 아방가르드 운동. 수직·수평선과 3원색(적·청·황), 무채색만을 사용하여 회화와 건축의 경계를 허문 추상 공간을 완성.",
        architects: ["gerrit-rietveld", "hendrik-berlage"],
        masterpiece: "슈뢰더 주택 (1924), 적청 의자 (1918)",
        keywords: ["신조형주의", "3원색과 격자", "가변형 무빙월", "탈물질화"]
      },
      {
        name: "국제주의 양식 (The International Style)",
        period: "1920s – 1960s",
        center: "유럽 및 미국 전역",
        slogan: "적을수록 풍요롭다 (Less is more).",
        desc: "지역적 특색이나 역사적 장식을 일절 배제하고, 철골과 콘크리트, 판유리를 통해 전 세계 어디에나 적용 가능한 보편적이고 투명한 공간을 추구한 근대 건축의 황금기.",
        architects: ["ludwig-mies", "le-corbusier", "philip-johnson"],
        masterpiece: "바르셀로나 파빌리온 (1929), 빌라 사보아 (1931), 시그램 빌딩 (1958)",
        keywords: ["근대 5원칙", "만능 공간", "스킨 앤 본", "철골과 유리 마천루"]
      },
      {
        name: "유기적 건축 (Organic Architecture)",
        period: "1900s – 1950s",
        center: "미국 중서부 / 애리조나 / 핀란드",
        slogan: "형태와 기능은 하나다. 건축은 대지로부터 자라나는 유기체다.",
        desc: "유럽의 차가운 기계주의 상자에 맞서 대지의 지형과 자연, 흙과 돌, 인간의 삶이 하나로 공명하는 건축. 프랭크 로이드 라이트의 프레리 하우스와 알토의 북유럽 풍토성이 대표적.",
        architects: ["frank-lloyd-wright", "alvar-aalto"],
        masterpiece: "낙수원 (1935), 구겐하임 미술관 (1959), 파이미오 요양원 (1933)",
        keywords: ["상자의 파괴", "캔틸레버", "대지와의 일체화", "곡면 자작나무", "자연 채광"]
      },
      {
        name: "뉴 브루탈리즘 (New Brutalism)",
        period: "1950s – 1970s",
        center: "영국 런던, 미국, 프랑스",
        slogan: "거친 콘크리트와 배관을 숨기지 마라. 가공되지 않은 재료의 진실성을 마주하라.",
        desc: "매끄러운 유리 상자 국제주의의 위선에 반발하여, 거친 목재 거푸집 자국이 남은 노출 콘크리트(Béton Brut)와 기계 배관, 철골을 가공 없이 웅장하게 드러낸 강력한 물질주의 운동.",
        architects: ["smithsons", "paul-rudolph", "marcel-breuer", "le-corbusier"],
        masterpiece: "로빈 후드 가든 (1972), 예일대 A&A 빌딩 (1963), 휘트니 미술관 (1966)",
        keywords: ["베통 브뤼", "코듀로이 콘크리트", "공중의 거리", "팀 10 반란"]
      },
      {
        name: "메타볼리즘 (Metabolism / 신진대사 건축)",
        period: "1960s – 1970s",
        center: "일본 도쿄",
        slogan: "건축은 고정된 기념비가 아니라 세포처럼 증식하고 교체되는 생명체다.",
        desc: "인구 폭발과 대도시 팽창에 대응하여, 영구적인 중앙 콘크리트 코어 샤프트에 공장에서 대량생산된 교체 가능한 모듈러 캡슐 주거를 장착한다는 아시아 최초의 국제적 건축 운동.",
        architects: ["kenzo-tange", "kisho-kurokawa"],
        masterpiece: "나카긴 캡슐 타워 (1972), 도쿄만 계획 1960",
        keywords: ["신진대사 생명관", "교체형 캡슐 유닛", "메가스트럭처", "선형 해상 도시"]
      },
      {
        name: "포스트모더니즘 (Postmodernism)",
        period: "1970s – 1990s",
        center: "미국, 이탈리아, 영국",
        slogan: "적을수록 지루하다 (Less is a bore).",
        desc: "모더니즘의 극단적 순수주의와 삭막한 기능주의를 '지루함'으로 규정하고, 역사적 고전 양식, 장식, 페디먼트, 색채, 은유와 위트를 자유롭게 콜라주한 다원주의 반란.",
        architects: ["robert-venturi", "aldo-rossi", "james-stirling", "philip-johnson"],
        masterpiece: "바나 벤투리 하우스 (1964), AT&T 빌딩 (1984), 슈투트가르트 미술관 (1984)",
        keywords: ["복합성과 대립성", "오리 vs 장식된 창고", "역사적 차용과 아이러니", "도시의 집단기억"]
      },
      {
        name: "해체주의 (Deconstructivism)",
        period: "1980s – 2000s",
        center: "미국 뉴욕(MoMA), 유럽",
        slogan: "직각의 독재를 파괴하라. 중력과 유클리드 기하학을 해체한 공간의 충격.",
        desc: "자크 데리다의 해체 철학과 러시아 절대주의를 융합하여, 수직·수평과 온전한 기하학을 왜곡·파편화하고 사선과 비대칭, 3D 파라메트릭 곡면으로 시각적 전율을 창조한 사조.",
        architects: ["peter-eisenman", "frank-gehry", "rem-koolhaas", "zaha-hadid", "daniel-libeskind", "bernard-tschumi"],
        masterpiece: "빌바오 구겐하임 (1997), 베를린 유대인 박물관 (2001), DDP 서울 (2014)",
        keywords: ["MoMA 1988 해체주의전", "자율적 형태", "티타늄 물결 곡면", "보이드(Void)", "사건의 건축"]
      },
      {
        name: "하이테크 건축 (High-Tech Architecture)",
        period: "1970s – 현재",
        center: "영국 런던, 프랑스 파리",
        slogan: "건축의 내장을 밖으로 드러내라. 최첨단 공학과 설비의 정직한 미학.",
        desc: "구조 엔지니어링과 기계 설비, 배관, 에스컬레이터를 숨기지 않고 건물 외벽으로 노출시키거나 초정밀 다이아그리드 외골격을 통해 내부의 무주 공간을 극대화한 건축.",
        architects: ["norman-foster", "renzo-piano", "richard-rogers"],
        masterpiece: "퐁피두 센터 (1977), 로이즈 빌딩 (1986), 거킨 타워 (2004), 더 샤드 (2012)",
        keywords: ["인사이드 아웃", "다이아그리드 구조", "에어로다이내믹 환기", "조인트 장인정신"]
      },
      {
        name: "비판적 지역주의 & 생태 지속가능성",
        period: "1980s – 현재",
        center: "전 세계",
        slogan: "그 땅의 바람과 흙, 인간의 손길을 존중할 때 건축은 지속된다.",
        desc: "세계화된 무국적 상업주의에 저항하여, 특정 대지의 지형, 빛과 그림자, 지역 고유의 흙·목재·돌, 그리고 주민들의 손길과 패시브 에너지 시스템을 결합한 성숙한 현대 건축.",
        architects: ["tadao-ando", "alvaro-siza", "kengo-kuma", "david-chipperfield", "diebedo-francis-kere"],
        masterpiece: "빛의 교회 (1989), 보아 노바 티하우스 (1963), 간도 초등학교 (2001), 신박물관 복원 (2009)",
        keywords: ["비판적 지역주의", "노출 콘크리트 현상학", "약한 건축", "적정 기술 흙벽돌", "시간을 초월한 절제"]
      }
    ];

    const container = document.getElementById('movements-guide-container');
    if (container) {
      container.innerHTML = `
        <div class="movements-grid">
          ${movements.map((m, idx) => `
            <div class="movement-card">
              <div class="movement-card-header">
                <span class="movement-number">${String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 class="movement-title">${m.name}</h3>
                  <div class="movement-meta">${m.period} · ${m.center}</div>
                </div>
              </div>
              <div class="movement-slogan">"${m.slogan}"</div>
              <p class="movement-desc">${m.desc}</p>
              
              <div class="movement-section">
                <span class="movement-label">대표 걸작:</span>
                <span class="movement-work-val">${m.masterpiece}</span>
              </div>

              <div class="movement-section">
                <span class="movement-label">핵심 인물:</span>
                <div class="movement-arch-chips">
                  ${m.architects.map(id => `
                    <button class="relation-chip jump-architect-btn" data-id="${id}">
                      <span>${this.getArchitectName(id)}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="movement-tags">
                ${m.keywords.map(k => `<span class="tag-pill">#${k}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Jump to architect in drawer
      container.querySelectorAll('.jump-architect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const arch = this.architects.find(a => a.id === id);
          if (arch) {
            modal.classList.remove('open');
            this.app.openDetailDrawer(arch);
          }
        });
      });
    }

    modal.classList.add('open');
  }

  // ========================================================
  // 4. 건축 공간 & 기술 핵심 용어 사전 (Architectural Glossary)
  // ========================================================
  openGlossary() {
    this.closeAllModals();
    const modal = document.getElementById('modal-glossary');
    if (!modal) return;

    const terms = [
      {
        term: "필로티 (Pilotis)",
        termEn: "Pilotis / Stilt Columns",
        creator: "le-corbusier",
        definition: "건물 1층의 내력벽을 없애고 독립된 철근 콘크리트 기둥만으로 건물을 지상에서 번쩍 띄워 올리는 근대건축 5원칙의 제1요소. 지상층을 보행자 광장, 녹지, 주차장으로 비워 도시의 연속성을 확보함.",
        works: "빌라 사보아 (1931), 위니테 다비타시옹 (1952)"
      },
      {
        term: "돔이노 시스템 (Dom-Ino System)",
        termEn: "Dom-Ino Structural System",
        creator: "le-corbusier",
        definition: "라틴어 Domus(집)와 이노베이션(혁신)의 합성어. 6개의 독립 기둥과 3장의 수평 콘크리트 바닥 슬래브, 계단만으로 건물의 뼈대를 완성하는 규격화 골조 특허. 내력벽이 사라져 내부 평면과 외벽 창문을 완전히 자유롭게 구성 가능해짐.",
        works: "근대 콘크리트 아파트 및 빌라 사보아의 모태"
      },
      {
        term: "르 모듈러 (Le Modulor)",
        termEn: "The Modulor",
        creator: "le-corbusier",
        definition: "인간의 신체 치수(신장 183cm, 팔을 든 높이 226cm)와 피보나치수열의 황금분할(1:1.618)을 수학적으로 결합한 인체공학적 척도 체계. '기계 문명 속에서 인간 척도의 조화를 회복하기 위한 도구'.",
        works: "마르세유 위니테 다비타시옹, 롱샹 성당"
      },
      {
        term: "라움플란 (Raumplan)",
        termEn: "Spatial Plan / 3D Space Layout",
        creator: "adolf-loos",
        definition: "단일한 2차원 평면 슬래브를 거부하고, 각 방의 중요도와 기능(거실, 서재, 식당 등)에 따라 층고와 바닥 높이를 입체적으로 달리하여 연속적으로 교차·맞물리게 하는 3차원 입체 공간 설계 기법.",
        works: "뮐러 저택 (프라하, 1930), 몰러 저택"
      },
      {
        term: "만능 공간 (Universal Space)",
        termEn: "Universal / Clear-span Space",
        creator: "ludwig-mies",
        definition: "건물 내부에 단 하나의 고정 내력벽이나 기둥도 두지 않고, 외부 거대 트러스나 외곽 기둥만으로 지탱하여 어떤 용도(강의실, 사무실, 전시장)로든 자유자재로 변경 가능한 궁극의 단일 열린 공간.",
        works: "IIT 크라운 홀 (1956), 베를린 신국립미술관 (1968)"
      },
      {
        term: "피부와 뼈대 (Skin and Bone)",
        termEn: "Skin and Bone Architecture",
        creator: "ludwig-mies",
        definition: "건물의 구조를 정직한 강철 뼈대(Bone)로 세우고, 그 사이를 투명한 판유리와 청동 멀리언 표피(Skin)로만 감싸는 미니멀리즘 마천루의 절대 미학.",
        works: "시그램 빌딩 (1958), 레이크쇼어 드라이브 아파트"
      },
      {
        term: "상자의 파괴 (Destruction of the Box)",
        termEn: "Destruction of the Box",
        creator: "frank-lloyd-wright",
        definition: "건물을 폐쇄된 방들의 조합인 '상자 곽'으로 보던 전통 관념을 파괴하고, 중심 벽난로를 코어로 삼아 벽체들을 모서리에서 분리시켜 캔틸레버 처마 아래로 공간이 무한히 흘러나가게 한 주거 혁명.",
        works: "로비 하우스 (1910), 낙수원 (1935)"
      },
      {
        term: "유기적 건축 (Organic Architecture)",
        termEn: "Organic Architecture",
        creator: "frank-lloyd-wright",
        definition: "건물이 주변 대지, 자연환경, 재료(돌·벽돌·나무), 그리고 거주자의 삶과 한 몸처럼 조화를 이루어, 대지로부터 자라나는 꽃과 나무처럼 필연적인 형태를 갖는 건축.",
        works: "낙수원 (카우프만 저택, 1935), 탈리에신"
      },
      {
        term: "커튼월 (Curtain Wall)",
        termEn: "Glass Curtain Wall",
        creator: "walter-gropius",
        definition: "건물의 하중을 전혀 받지 않고 마치 커튼처럼 외벽에 매달아 바람과 비만을 막아주는 투명 유리 외벽 시스템. 기둥을 모서리 안쪽으로 후퇴시켜 모서리 기둥이 없는 무중력 투명성을 획득함.",
        works: "파구스 공장 (1911), 데사우 바우하우스 (1926)"
      },
      {
        term: "봉사하는 공간 vs 봉사받는 공간",
        termEn: "Servant Spaces and Served Spaces",
        creator: "louis-kahn",
        definition: "건물의 공간 위계를 명쾌하게 이분화하여, 계단실·엘리베이터·배관·화장실·기계실은 '봉사하는 공간' 타워로 묶고, 연구실·거실·전시실은 방해받지 않는 순수한 '봉사받는 공간'으로 독립시킨 공간론.",
        works: "펜실베이니아대 리처즈 의학연구소 (1960), 솔크 연구소"
      },
      {
        term: "침묵과 빛 (Silence and Light)",
        termEn: "Silence and Light",
        creator: "louis-kahn",
        definition: "침묵(형태 이전의 존재하려는 갈망, 측정 불가능한 영성)과 빛(물질을 드러내는 에너지, 측정 가능한 형태)이 만나는 경계에서 비로소 진정한 건축의 공간이 탄생한다는 형이상학적 철학.",
        works: "솔크 생물학 연구소 (1965), 킴벨 미술관 (1972)"
      },
      {
        term: "오리 vs 장식된 창고",
        termEn: "Duck vs Decorated Shed",
        creator: "robert-venturi",
        definition: "건물 전체가 특이한 조각 형상(오리 모양 식당처럼)이 되어버린 모더니즘의 왜곡을 '오리(Duck)'라 비판하고, 실용적인 상자 건물 위에 상징적 기호와 간판을 덧붙인 정직한 건물을 '장식된 창고'로 옹호한 포스트모던 이론.",
        works: "『라스베이거스의 교훈 (1972)』, 바나 벤투리 하우스"
      },
      {
        term: "거대함 (Bigness)",
        termEn: "Bigness (S,M,L,XL)",
        creator: "rem-koolhaas",
        definition: "건물의 규모가 일정 한계를 초과하여 거대해지면(Bigness), 기존의 건축적 파사드 조작이나 단일 작가의 통제를 벗어나 그 자체로 하나의 복합적인 도시 생태계가 된다는 현대 대도시 이론.",
        works: "베이징 CCTV 본사 (2012), 시애틀 중앙도서관"
      },
      {
        term: "파라메트리시즘 (Parametricism)",
        termEn: "Parametric Architecture",
        creator: "zaha-hadid",
        definition: "수작업 직각 도면 대신, 파라미터(수학적 변수: 풍향, 일조, 구조 하중, 동선)를 코딩 알고리즘에 입력하여 중력을 거스르는 유기적인 3D 유체 역학 곡면 형태를 생성하는 현대 디지털 건축 사조.",
        works: "동대문디자인플라자 DDP (2014), 로마 MAXXI 미술관"
      },
      {
        term: "약한 건축 (Defeated Architecture)",
        termEn: "Defeated / Anti-Object Architecture",
        creator: "kengo-kuma",
        definition: "콘크리트 덩어리로 자연을 지배하고 과시하려는 '강한 건축(오브젝트)'을 반성하고, 건축이 자연 앞에 겸허히 패배하여 건물을 잘게 쪼갠 나무 루버 입자로 분해해 환경과 융합하는 건축.",
        works: "도쿄 올림픽 신국립경기장 (2019), 아사쿠사 관광센터"
      },
      {
        term: "인사이드 아웃 (Inside-Out)",
        termEn: "Inside-Out Architecture",
        creator: "richard-rogers",
        definition: "실내 면적을 극대화하고 무주 자유 공간을 확보하기 위해, 승강기, 에스컬레이터, 공조 덕트, 수도관 등 모든 내부 설비와 구조 트러스를 건물 외벽으로 완전히 끄집어내어 노출시키는 하이테크 공법.",
        works: "파리 퐁피두 센터 (1977), 런던 로이즈 빌딩 (1986)"
      },
      {
        term: "코듀로이 콘크리트 (Corduroy Concrete)",
        termEn: "Bush-hammered Corduroy Concrete",
        creator: "paul-rudolph",
        definition: "세로 골이 파인 거푸집에 콘크리트를 타설한 뒤, 굳은 표면의 골 리브를 석공들이 망치와 정으로 직접 깨뜨려 거친 자갈 골재가 빛을 산란시키도록 텍스처를 낸 브루탈리즘 기법.",
        works: "예일대 예술건축학부 루돌프 홀 (1963)"
      },
      {
        term: "역현수선 구조 (Catenary Arch)",
        termEn: "Inverted Catenary Arch",
        creator: "antoni-gaudi",
        definition: "양 끝을 고정하고 중력에 의해 자연스럽게 늘어뜨린 줄(현수선)의 형태를 위아래로 거꾸로 뒤집으면, 오직 압축력만 작용하여 굽힘 모멘트가 제로가 되는 가장 완벽하고 경제적인 역학적 아치.",
        works: "사그라다 파밀리아 성당, 카사 밀라 다락 아치, 세인트루이스 게이트웨이 아치"
      }
    ];

    const container = document.getElementById('glossary-container');
    if (container) {
      container.innerHTML = `
        <div class="glossary-header-meta">
          <span>총 <strong>${terms.length}</strong>개의 핵심 건축 개념 & 공간 설계 원리</span>
          <span style="color: var(--text-muted); font-size: 0.78rem;">건축사 시험 및 실무 설계에 필수적인 공인 학술 개념들입니다.</span>
        </div>
        <div class="glossary-grid">
          ${terms.map((t, i) => `
            <div class="glossary-card">
              <div class="glossary-card-top">
                <span class="glossary-num">${String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4 class="glossary-term">${t.term}</h4>
                  <div class="glossary-en">${t.termEn}</div>
                </div>
              </div>
              <p class="glossary-def">${t.definition}</p>
              <div class="glossary-meta-row">
                <span class="glossary-creator-label">주창 / 완성:</span>
                <button class="relation-chip jump-architect-btn" data-id="${t.creator}">
                  <span>${this.getArchitectName(t.creator)}</span>
                </button>
              </div>
              <div class="glossary-works-row">
                <span class="glossary-creator-label">대표 적용:</span>
                <span class="glossary-work-text">${t.works}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Jump to architect in drawer
      container.querySelectorAll('.jump-architect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const arch = this.architects.find(a => a.id === id);
          if (arch) {
            modal.classList.remove('open');
            this.app.openDetailDrawer(arch);
          }
        });
      });
    }

    modal.classList.add('open');
  }

  // ========================================================
  // 5. 고해상도 도면 돋보기 & 다이어그램 라이트박스 (Blueprint Lightbox)
  // ========================================================
  openBlueprint(architect, imgUrl, title, type, desc) {
    this.closeAllModals();
    const modal = document.getElementById('modal-blueprint-lightbox');
    if (!modal) return;

    this.lightboxState.zoom = 1;
    this.lightboxState.panX = 0;
    this.lightboxState.panY = 0;

    const imgEl = document.getElementById('lightbox-image');
    const titleEl = document.getElementById('lightbox-title');
    const metaEl = document.getElementById('lightbox-meta');
    const typeBadge = document.getElementById('lightbox-type-badge');
    const descEl = document.getElementById('lightbox-desc');
    const originalLink = document.getElementById('lightbox-original-link');

    if (imgEl) {
      imgEl.src = imgUrl;
      imgEl.style.transform = `translate(0px, 0px) scale(1)`;
    }
    if (titleEl) titleEl.textContent = title || `${architect.nameKo} 대표 건축 도면`;
    if (metaEl) metaEl.textContent = `${architect.nameKo} (${architect.nameEn}) · ${architect.movement}`;
    if (typeBadge) typeBadge.textContent = type || architect.blueprintType || "평면도 (Floor Plan)";
    if (descEl) descEl.textContent = desc || architect.blueprintDesc || "건축학적으로 검증된 정밀 건축 도면 및 공간 다이어그램입니다.";
    if (originalLink) originalLink.href = imgUrl;

    modal.classList.add('open');
  }

  setupLightboxEvents() {
    const modal = document.getElementById('modal-blueprint-lightbox');
    const img = document.getElementById('lightbox-image');
    const canvas = document.getElementById('lightbox-canvas-area');
    if (!modal || !img || !canvas) return;

    const btnZoomIn = document.getElementById('btn-lb-zoom-in');
    const btnZoomOut = document.getElementById('btn-lb-zoom-out');
    const btnReset = document.getElementById('btn-lb-reset');

    const updateTransform = () => {
      img.style.transform = `translate(${this.lightboxState.panX}px, ${this.lightboxState.panY}px) scale(${this.lightboxState.zoom})`;
      const zoomText = document.getElementById('lightbox-zoom-val');
      if (zoomText) zoomText.textContent = `${Math.round(this.lightboxState.zoom * 100)}%`;
    };

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        this.lightboxState.zoom = Math.min(4.5, this.lightboxState.zoom * 1.3);
        updateTransform();
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        this.lightboxState.zoom = Math.max(0.4, this.lightboxState.zoom / 1.3);
        updateTransform();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.lightboxState.zoom = 1;
        this.lightboxState.panX = 0;
        this.lightboxState.panY = 0;
        updateTransform();
      });
    }

    // Wheel zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.15 : 0.87;
      this.lightboxState.zoom = Math.max(0.4, Math.min(4.5, this.lightboxState.zoom * delta));
      updateTransform();
    }, { passive: false });

    // Drag / Pan
    canvas.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      this.lightboxState.isDragging = true;
      this.lightboxState.startX = e.clientX - this.lightboxState.panX;
      this.lightboxState.startY = e.clientY - this.lightboxState.panY;
      canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.lightboxState.isDragging) return;
      this.lightboxState.panX = e.clientX - this.lightboxState.startX;
      this.lightboxState.panY = e.clientY - this.lightboxState.startY;
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.lightboxState.isDragging) {
        this.lightboxState.isDragging = false;
        canvas.style.cursor = 'grab';
      }
    });
  }

  // ========================================================
  // 6. 건축사 자가진단 퀴즈 & 플래시카드 (Interactive Quiz)
  // ========================================================
  openQuizModal() {
    this.closeAllModals();
    const modal = document.getElementById('modal-quiz');
    if (!modal) return;

    this.quizState.score = 0;
    this.quizState.total = 0;
    this.quizState.streak = 0;

    this.updateQuizStats();
    this.nextQuizQuestion();

    // Mode buttons
    modal.querySelectorAll('.quiz-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.quiz-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.quizState.mode = btn.getAttribute('data-mode');
        this.nextQuizQuestion();
      });
    });

    modal.classList.add('open');
  }

  updateQuizStats() {
    const scoreEl = document.getElementById('quiz-score-val');
    const totalEl = document.getElementById('quiz-total-val');
    const streakEl = document.getElementById('quiz-streak-val');

    if (scoreEl) scoreEl.textContent = this.quizState.score;
    if (totalEl) totalEl.textContent = this.quizState.total;
    if (streakEl) streakEl.textContent = this.quizState.streak;
  }

  nextQuizQuestion() {
    const container = document.getElementById('quiz-question-container');
    if (!container || !this.architects || this.architects.length < 4) return;

    // Pick 1 target and 3 distractors
    const target = this.architects[Math.floor(Math.random() * this.architects.length)];
    const distractors = this.architects
      .filter(a => a.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());
    this.quizState.currentQuestion = { target, options };

    let questionHtml = '';
    const mode = this.quizState.mode;

    if (mode === 'visual') {
      const isBlueprint = Math.random() > 0.5;
      const mediaUrl = isBlueprint ? target.blueprintImg : target.buildingImg;
      const mediaLabel = isBlueprint ? `도면 유형: ${target.blueprintType || '설계 평면도'}` : `대표 건축물`;

      questionHtml = `
        <div class="quiz-question-box">
          <div class="quiz-badge">도면 & 건물 비주얼 퀴즈</div>
          <h3 class="quiz-prompt">아래 ${isBlueprint ? '설계 도면' : '건축물'}의 주인공인 건축가는 누구일까요?</h3>
          
          <div class="quiz-media-preview">
            <img src="${mediaUrl}" class="quiz-image" alt="Quiz Media">
            <span class="quiz-media-tag">${mediaLabel}</span>
          </div>
          
          <div class="quiz-options-grid">
            ${options.map(opt => `
              <button class="quiz-opt-btn" data-id="${opt.id}">
                <span class="opt-name">${opt.nameKo}</span>
                <span class="opt-sub">${opt.nameEn.split('(')[0]} · ${opt.country}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback-box" id="quiz-feedback"></div>
        </div>
      `;
    } else if (mode === 'quote') {
      questionHtml = `
        <div class="quiz-question-box">
          <div class="quiz-badge">건축 명언 & 철학 퀴즈</div>
          <h3 class="quiz-prompt">다음 명언을 남긴 건축가는 누구일까요?</h3>
          
          <div class="quiz-quote-display">
            "${target.quote}"
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
            핵심 사조: <span style="color: var(--text-accent); font-weight: 600;">${target.movement}</span>
          </div>

          <div class="quiz-options-grid">
            ${options.map(opt => `
              <button class="quiz-opt-btn" data-id="${opt.id}">
                <span class="opt-name">${opt.nameKo}</span>
                <span class="opt-sub">${opt.nameEn.split('(')[0]} · ${opt.country}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback-box" id="quiz-feedback"></div>
        </div>
      `;
    } else if (mode === 'genealogy') {
      const edge = (window.INFLUENCE_EDGES || []).find(e => e.to === target.id);
      let mentorName = "선행 거장";
      let mentorRelation = "스승/영향";
      if (edge) {
        mentorName = this.getArchitectName(edge.from);
        mentorRelation = edge.label;
      }

      questionHtml = `
        <div class="quiz-question-box">
          <div class="quiz-badge">사제·계보 족보 퀴즈</div>
          <h3 class="quiz-prompt">다음 사제/영향 관계에 해당하는 건축가는 누구일까요?</h3>
          
          <div class="quiz-genealogy-display">
            <div class="genealogy-mentor-card">
              <span class="role-badge">스승 / 선행 영향</span>
              <strong>${mentorName}</strong>
            </div>
            <div class="genealogy-arrow">➔ (${mentorRelation}) ➔</div>
            <div class="genealogy-target-card">
              <span class="role-badge">수제자 / 계승자</span>
              <strong>? ? ?</strong>
            </div>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
            대표 걸작: <span style="color: var(--text-accent); font-weight: 600;">${target.masterpiece}</span>
          </div>

          <div class="quiz-options-grid">
            ${options.map(opt => `
              <button class="quiz-opt-btn" data-id="${opt.id}">
                <span class="opt-name">${opt.nameKo}</span>
                <span class="opt-sub">${opt.nameEn.split('(')[0]} · ${opt.country}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback-box" id="quiz-feedback"></div>
        </div>
      `;
    }

    container.innerHTML = questionHtml;

    // Attach answer click events
    container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedId = btn.getAttribute('data-id');
        this.handleQuizAnswer(selectedId, target);
      });
    });
  }

  handleQuizAnswer(selectedId, target) {
    const feedbackBox = document.getElementById('quiz-feedback');
    const buttons = document.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(b => b.disabled = true);

    this.quizState.total++;
    const isCorrect = selectedId === target.id;

    if (isCorrect) {
      this.quizState.score++;
      this.quizState.streak++;
    } else {
      this.quizState.streak = 0;
    }

    this.updateQuizStats();

    buttons.forEach(b => {
      const id = b.getAttribute('data-id');
      if (id === target.id) {
        b.classList.add('correct');
      } else if (id === selectedId) {
        b.classList.add('wrong');
      }
    });

    if (feedbackBox) {
      feedbackBox.innerHTML = `
        <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
          <div class="feedback-header">
            <span class="feedback-icon">${isCorrect ? '🎉 정답입니다!' : '❌ 아쉽습니다! 오답입니다.'}</span>
            <span class="feedback-correct-answer">정답: <strong>${target.nameKo} (${target.nameEn.split('(')[0]})</strong></span>
          </div>
          <div class="feedback-explanation">
            <p><strong>[학술 해설]</strong> ${target.desc}</p>
            <p style="margin-top: 6px;">🏛️ <strong>대표작:</strong> ${target.masterpiece} (${target.birth}–${target.death || '현재'})</p>
            <p style="margin-top: 6px;">💡 <strong>역사적 비화:</strong> ${target.anecdote}</p>
          </div>
          <button class="btn btn-primary" id="btn-next-quiz" style="margin-top: 14px; width: 100%;">
            <span>다음 문제 도전 ➔</span>
          </button>
        </div>
      `;

      const nextBtn = document.getElementById('btn-next-quiz');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextQuizQuestion());
      }
    }
  }

  // ========================================================
  // 7. 시험 대비 수험 요약집 인쇄 / 마크다운 내보내기 (Study Exporter)
  // ========================================================
  openStudyExporter() {
    this.closeAllModals();
    const modal = document.getElementById('modal-study-export');
    if (!modal) return;

    const container = document.getElementById('study-export-container');
    if (container) {
      const markdownContent = this.generateStudyMarkdown();
      container.innerHTML = `
        <div class="exporter-wrapper">
          <div class="exporter-toolbar">
            <button class="btn btn-primary" id="btn-print-summary">
              <span>🖨️ 인쇄 / PDF 저장</span>
            </button>
            <button class="btn" id="btn-copy-markdown">
              <span>📋 마크다운 서브노트 복사</span>
            </button>
          </div>
          <div class="exporter-preview-paper" id="printable-summary-paper">
            <div class="paper-header">
              <h2 style="margin: 0; font-family: var(--font-serif); font-size: 1.5rem;">🏛️ 근현대 건축사 핵심 요약 서브노트</h2>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
                50인 거장 계보학 · 사조별 핵심 명제 · 대표작 분석 총정리
              </div>
            </div>

            <!-- 50 Architects Quick Table -->
            <table class="paper-table">
              <thead>
                <tr>
                  <th style="width: 50px;">시대</th>
                  <th style="width: 140px;">건축가 (출생-사망)</th>
                  <th style="width: 110px;">사조/학파</th>
                  <th>핵심 철학 & 슬로건</th>
                  <th style="width: 180px;">대표 걸작</th>
                </tr>
              </thead>
              <tbody>
                ${this.architects.map(a => `
                  <tr>
                    <td style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${a.eraId.replace('era-', '')}</td>
                    <td><strong>${a.nameKo}</strong><br><small style="color: var(--text-muted);">${a.nameEn.split('(')[0]} (${a.birth}-${a.death || '현'})</small></td>
                    <td><span class="tag-pill" style="font-size: 0.72rem;">${a.movement.split('(')[0]}</span></td>
                    <td style="font-size: 0.8rem; line-height: 1.4;">
                      <em>"${a.quote || ''}"</em><br>
                      <small style="color: var(--text-secondary);">${a.desc.slice(0, 75)}...</small>
                    </td>
                    <td style="font-size: 0.78rem;"><strong>${a.masterpiece.split(',')[0]}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      // Copy markdown
      const btnCopy = document.getElementById('btn-copy-markdown');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          navigator.clipboard.writeText(markdownContent).then(() => {
            alert('마크다운 서브노트가 클립보드에 복사되었습니다! 노션(Notion)이나 옵시디언(Obsidian)에 붙여넣어 활용하세요.');
          });
        });
      }

      // Print
      const btnPrint = document.getElementById('btn-print-summary');
      if (btnPrint) {
        btnPrint.addEventListener('click', () => {
          window.print();
        });
      }
    }

    modal.classList.add('open');
  }

  generateStudyMarkdown() {
    let md = `# 🏛️ 근현대 건축사 핵심 요약 서브노트\n\n`;
    md += `생성일: ${new Date().toLocaleDateString('ko-KR')} | 총 50인 대표 건축가 데이터베이스\n\n`;
    md += `## 50인 건축가 핵심 총정리\n\n`;
    md += `| 번호 | 건축가 | 생애 | 국적 | 주요 사조 | 대표 걸작 | 핵심 명언 & 철학 |\n`;
    md += `|:---|:---|:---|:---|:---|:---|:---|\n`;

    this.architects.forEach((a, i) => {
      md += `| ${i + 1} | **${a.nameKo}** (${a.nameEn}) | ${a.birth}–${a.death || '현재'} | ${a.country} | ${a.movement} | ${a.masterpiece.split(',')[0]} | "${a.quote}" |\n`;
    });

    md += `\n## 4대 거장 핵심 공간 개념\n\n`;
    md += `- **프랭크 로이드 라이트**: 상자의 파괴 (Destruction of the Box), 중심 벽난로를 축으로 하는 유기적 수평 평면, 캔틸레버 구조와 대지 일체화\n`;
    md += `- **르 코르뷔지에**: 근대건축 5원칙 (필로티, 옥상정원, 자유로운 평면, 가로로 긴 창, 자유로운 입면), 돔이노 시스템, 르 모듈러\n`;
    md += `- **루트비히 미스 반 데어 로에**: "Less is more", 만능 공간(Universal Space), 스킨 앤 본(Skin and Bone), 크롬 십자형 기둥과 유동적 공간\n`;
    md += `- **발터 그로피우스**: "예술과 기술의 새로운 통합", 바우하우스(Bauhaus), 세계 최초 전면 유리 커튼월(Curtain Wall), 표준화 대량생산\n`;
    md += `- **알바 알토**: 인간 중심의 유기적 기능주의, 곡면 자작나무 합판, 자연광 간접 확산, 핀란드 풍토성과 자연 융합\n\n`;

    return md;
  }
}

if (typeof window !== 'undefined') {
  window.ArchiStudy = ArchiStudy;
}
