// ARCHI-GENEALOGY: 도면 & 명작 갤러리 뷰 (Blueprints & Masterpieces Gallery)

class ArchiGallery {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.onSelectArchitect = options.onSelectArchitect || (() => {});
    
    this.architects = [];
    this.edges = [];
    this.eras = [];
    this.activeEraId = null;
    this.searchQuery = "";
    this.mediaType = "all"; // 'all' | 'blueprint' | 'building' | 'portrait'
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

  setMediaType(type) {
    this.mediaType = type;
    this.render();
  }

  render() {
    if (!this.container) return;

    const eraMap = {};
    this.eras.forEach(e => { eraMap[e.id] = e; });

    let filtered = this.architects.filter(a => {
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

    // 미디어 항목 추출 (건축가별 도면, 건물 사진, 인물 사진)
    const mediaItems = [];
    filtered.forEach(arch => {
      const era = eraMap[arch.eraId] || { name: "", color: "#58a6ff" };

      if (this.mediaType === 'all' || this.mediaType === 'blueprint') {
        if (arch.blueprintImg) {
          mediaItems.push({
            type: 'blueprint',
            typeLabel: '📐 건축 도면/평면도',
            img: arch.blueprintImg,
            title: `${arch.nameKo} - 도면 및 평면도`,
            subtitle: arch.masterpiece.split(',')[0],
            architect: arch,
            era
          });
        }
      }

      if (this.mediaType === 'all' || this.mediaType === 'building') {
        if (arch.buildingImg) {
          mediaItems.push({
            type: 'building',
            typeLabel: '🏛️ 대표 건축물',
            img: arch.buildingImg,
            title: arch.masterpiece.split(',')[0],
            subtitle: `${arch.nameKo} (${arch.country})`,
            architect: arch,
            era
          });
        }
      }

      if (this.mediaType === 'all' || this.mediaType === 'portrait') {
        if (arch.portraitImg) {
          mediaItems.push({
            type: 'portrait',
            typeLabel: '👤 건축가 인물',
            img: arch.portraitImg,
            title: `${arch.nameKo} (${arch.nameEn})`,
            subtitle: `${arch.birth}–${arch.death || '현재'} · ${arch.movement}`,
            architect: arch,
            era
          });
        }
      }
    });

    const isMaster = (id) => ["frank-lloyd-wright", "le-corbusier", "ludwig-mies", "walter-gropius", "alvar-aalto"].includes(id);

    const html = `
      <div class="gallery-container">
        <!-- Gallery Controls Bar -->
        <div class="gallery-toolbar">
          <div class="gallery-type-filter">
            <button class="gallery-type-btn ${this.mediaType === 'all' ? 'active' : ''}" data-type="all">
              <span>🖼️ 전체 미디어 (${mediaItems.length})</span>
            </button>
            <button class="gallery-type-btn ${this.mediaType === 'blueprint' ? 'active' : ''}" data-type="blueprint">
              <span>📐 도면 & 평면도</span>
            </button>
            <button class="gallery-type-btn ${this.mediaType === 'building' ? 'active' : ''}" data-type="building">
              <span>🏛️ 대표 건축물 사진</span>
            </button>
            <button class="gallery-type-btn ${this.mediaType === 'portrait' ? 'active' : ''}" data-type="portrait">
              <span>👤 거장 인물 사진</span>
            </button>
          </div>

          <div class="gallery-stats">
            <span>선택된 시대: <strong style="color: var(--text-primary);">${this.activeEraId && this.activeEraId !== 'all' ? eraMap[this.activeEraId]?.name : '전체 시대'}</strong></span>
            <span style="opacity: 0.3;">|</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">카드를 클릭하면 상세 도면과 건축 계보 노트를 볼 수 있습니다.</span>
          </div>
        </div>

        <!-- Gallery Grid -->
        ${mediaItems.length === 0 ? `
          <div style="text-align: center; padding: 80px 0; color: var(--text-muted);">
            <div style="font-size: 1.1rem; margin-bottom: 8px;">해당 조건의 도면 및 미디어가 없습니다.</div>
            <div style="font-size: 0.85rem;">상단 필터나 검색어를 변경해 보세요.</div>
          </div>
        ` : `
          <div class="gallery-grid">
            ${mediaItems.map(item => {
              const arch = item.architect;
              const master = isMaster(arch.id);

              return `
                <div class="gallery-card" data-id="${arch.id}" data-type="${item.type}">
                  <div class="gallery-img-wrapper">
                    <img src="${item.img}" 
                         alt="${item.title}" 
                         loading="lazy" 
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80';">
                    <span class="gallery-tag-badge" style="background: ${item.type === 'blueprint' ? 'rgba(37, 99, 235, 0.9)' : item.type === 'building' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(139, 92, 246, 0.9)'};">
                      ${item.typeLabel}
                    </span>
                    ${master ? `<span class="gallery-master-badge">⭐ 4대 거장</span>` : ''}
                  </div>

                  <div class="gallery-card-body">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                      <span style="font-size: 0.72rem; color: ${item.era.color}; font-weight: 700;">${item.era.name}</span>
                      <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">${arch.birth}–${arch.death || '현재'}</span>
                    </div>

                    <h4 class="gallery-card-title">${item.title}</h4>
                    <p class="gallery-card-sub">${item.subtitle}</p>

                    <div class="gallery-card-footer">
                      <span class="gallery-movement-badge">${arch.movement}</span>
                      <span class="gallery-view-more">상세 연구 보기 →</span>
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
    const cards = this.container.querySelectorAll(".gallery-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const arch = this.architects.find(a => a.id === id);
        if (arch) {
          this.onSelectArchitect(arch);
        }
      });
    });

    const filterBtns = this.container.querySelectorAll(".gallery-type-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        this.setMediaType(type);
      });
    });
  }
}

window.ArchiGallery = ArchiGallery;
