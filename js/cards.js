// 아카이브 카드 디렉토리 뷰 (Archive Directory View)

class ArchiCards {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.onSelectArchitect = options.onSelectArchitect || (() => {});
    
    this.architects = [];
    this.edges = [];
    this.eras = [];
    this.activeEraId = null;
    this.searchQuery = "";
    this.sortBy = "birth-asc";
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
  }

  setSearchQuery(query) {
    this.searchQuery = (query || "").trim().toLowerCase();
    this.render();
  }

  setSortBy(sortKey) {
    this.sortBy = sortKey;
    this.render();
  }

  render() {
    if (!this.container) return;

    const eraMap = {};
    this.eras.forEach(e => { eraMap[e.id] = e; });

    let list = this.architects.filter(a => {
      if (this.activeEraId && this.activeEraId !== "all" && a.eraId !== this.activeEraId) {
        return false;
      }
      if (this.searchQuery) {
        const q = this.searchQuery;
        const match =
          a.nameKo.toLowerCase().includes(q) ||
          a.nameEn.toLowerCase().includes(q) ||
          a.movement.toLowerCase().includes(q) ||
          (a.country && a.country.toLowerCase().includes(q)) ||
          (a.masterpiece && a.masterpiece.toLowerCase().includes(q)) ||
          (a.tags && a.tags.some(t => t.toLowerCase().includes(q)));
        if (!match) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (this.sortBy === "birth-asc") return a.birth - b.birth;
      if (this.sortBy === "birth-desc") return b.birth - a.birth;
      if (this.sortBy === "name-ko") return a.nameKo.localeCompare(b.nameKo, 'ko');
      if (this.sortBy === "name-en") return a.nameEn.localeCompare(b.nameEn, 'en');
      return 0;
    });

    const isMaster = (id) => ["frank-lloyd-wright", "le-corbusier", "ludwig-mies", "walter-gropius", "alvar-aalto"].includes(id);

    const html = `
      <div class="cards-container">
        <div class="cards-meta-bar">
          <div>
            <span>총 <strong style="color: var(--text-primary); font-size: 1.05rem;">${list.length}</strong>인의 건축가 아카이브</span>
            ${this.searchQuery ? `<span style="margin-left: 8px; color: var(--text-accent);">("${this.searchQuery}" 검색됨)</span>` : ''}
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="font-size: 0.8rem; color: var(--text-muted);">정렬:</label>
            <select id="archive-sort-select" class="form-control" style="padding: 4px 10px; font-size: 0.82rem; width: auto; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 6px;">
              <option value="birth-asc" ${this.sortBy === 'birth-asc' ? 'selected' : ''}>출생연도순 (역사 흐름)</option>
              <option value="birth-desc" ${this.sortBy === 'birth-desc' ? 'selected' : ''}>출생연도 역순 (최신순)</option>
              <option value="name-ko" ${this.sortBy === 'name-ko' ? 'selected' : ''}>이름순 (가나다)</option>
              <option value="name-en" ${this.sortBy === 'name-en' ? 'selected' : ''}>이름순 (Alphabet)</option>
            </select>
          </div>
        </div>

        ${list.length === 0 ? `
          <div style="text-align: center; padding: 60px 0; color: var(--text-muted);">
            <div style="font-size: 1.1rem; margin-bottom: 8px;">검색 조건에 맞는 건축가를 찾을 수 없습니다.</div>
            <div style="font-size: 0.85rem;">검색어를 확인하거나 상단 필터를 초기화해 보세요.</div>
          </div>
        ` : `
          <div class="cards-grid">
            ${list.map(arch => {
              const era = eraMap[arch.eraId] || { name: "", color: "#58a6ff" };
              const lifespan = arch.death ? `${arch.birth} – ${arch.death}` : `${arch.birth} – 현재`;
              const masterBadge = isMaster(arch.id);
              const bannerImg = arch.buildingImg || arch.blueprintImg;
              const portrait = arch.portraitImg;

              return `
                <div class="timeline-card archive-card-item" data-id="${arch.id}" style="border-top: 3px solid ${era.color};">
                  <!-- Visual Card Banner -->
                  <div class="card-visual-banner">
                    <img src="${bannerImg}" 
                         alt="${arch.masterpiece}" 
                         class="card-banner-bg" 
                         loading="lazy" 
                         onerror="this.style.opacity='0.2';">
                    <div class="card-banner-overlay"></div>
                    
                    <div class="card-portrait-badge">
                      <img src="${portrait}" 
                           alt="${arch.nameKo}" 
                           loading="lazy" 
                           onerror="this.style.display='none';">
                    </div>

                    ${masterBadge ? `
                      <span class="card-master-tag">
                        ★ 근대 4대 거장
                      </span>
                    ` : ''}
                    
                    <span class="card-era-tag" style="background: rgba(13, 17, 23, 0.85); color: ${era.color}; border: 1px solid ${era.color};">
                      ${era.name}
                    </span>
                  </div>

                  <div class="card-body-content">
                    <div class="card-top">
                      <div>
                        <div class="architect-name-ko" style="font-size: 1.15rem;">
                          ${arch.nameKo}
                        </div>
                        <div class="architect-name-en">${arch.nameEn} · ${arch.country}</div>
                      </div>
                      <span class="lifespan-badge">${lifespan}</span>
                    </div>

                    <div class="architect-movement" style="margin: 6px 0 10px 0; color: ${era.color}; font-weight: 600;">
                      ${arch.movement}
                    </div>

                    ${arch.quote ? `
                      <div class="architect-quote">"${arch.quote}"</div>
                    ` : ''}

                    ${arch.masterpiece ? `
                      <div class="architect-masterpiece" style="margin-top: 10px;">
                        <span style="color: var(--text-muted); font-size: 0.72rem; font-weight: 700;">대표작</span>
                        <span>${arch.masterpiece}</span>
                      </div>
                    ` : ''}

                    <div class="card-bottom-tags" style="margin-top: 14px;">
                      ${(arch.tags || []).slice(0, 3).map(tag => `
                        <span class="tag-pill">#${tag}</span>
                      `).join("")}
                      <div class="genealogy-indicator">
                        <span>도면 & 상세 보기 →</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `}
      </div>
    `;

    this.container.innerHTML = html;
    this.bindEvents();
  }

  bindEvents() {
    const cards = this.container.querySelectorAll(".archive-card-item");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const arch = this.architects.find(a => a.id === id);
        if (arch) {
          this.onSelectArchitect(arch);
        }
      });
    });

    const sortSelect = this.container.querySelector("#archive-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.render();
      });
    }
  }
}

window.ArchiCards = ArchiCards;
