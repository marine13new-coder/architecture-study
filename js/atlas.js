// ========================================================
// ARCHI-ATLAS: World Architecture Geographic Atlas & City Explorer
// 전 세계 50인 거장의 랜드마크 명작을 지리적·도시별로 탐색하는 아틀라스 뷰
// ========================================================

class ArchiAtlas {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.onSelectArchitect = options.onSelectArchitect || (() => {});
    this.architects = [];
    this.currentRegion = 'all'; // 'all' | '유럽' | '북미' | '아시아' | '남미' | '아프리카'
    this.selectedCity = null;
  }

  setData(architects, edges, eras) {
    this.architects = architects;
    this.render();
  }

  getCityClusters() {
    const clusters = {};
    this.architects.forEach(a => {
      const g = a.geo || { city: a.country, country: a.country, region: "기타", lat: 0, lng: 0 };
      const cityKey = `${g.city}, ${g.country}`;
      if (!clusters[cityKey]) {
        clusters[cityKey] = {
          city: g.city,
          country: g.country,
          region: g.region,
          lat: g.lat,
          lng: g.lng,
          architects: []
        };
      }
      clusters[cityKey].architects.push(a);
    });
    return Object.values(clusters);
  }

  render() {
    if (!this.container) return;

    const allClusters = this.getCityClusters();
    const filteredClusters = this.currentRegion === 'all'
      ? allClusters
      : allClusters.filter(c => c.region === this.currentRegion || (this.currentRegion === '남미/아프리카' && (c.region === '남미' || c.region === '아프리카')));

    const totalArchitectsCount = filteredClusters.reduce((sum, c) => sum + c.architects.length, 0);

    this.container.innerHTML = `
      <div class="atlas-wrapper">
        <!-- Atlas Header Bar -->
        <div class="atlas-header">
          <div class="atlas-title-group">
            <div class="atlas-badge">
              <i data-lucide="globe"></i>
              <span>GEOGRAPHIC ARCHITECTURE ATLAS</span>
            </div>
            <h2 class="atlas-title">세계 건축 아틀라스 & 도시별 랜드마크 탐색</h2>
            <p class="atlas-subtitle">
              시카고의 마천루, 파리의 모더니즘, 베를린의 바우하우스부터 서울의 현대건축까지 전 세계 거장들의 활동 무대를 탐색하세요.
            </p>
          </div>

          <!-- Region Filter Pills -->
          <div class="atlas-region-pills">
            ${[
              { id: 'all', label: '전 세계 (Global)' },
              { id: '유럽', label: '🇪🇺 유럽 (Europe)' },
              { id: '북미', label: '🇺🇸 북미 (North America)' },
              { id: '아시아', label: '🌏 아시아 (Asia)' },
              { id: '남미/아프리카', label: '🌍 남미 & 아프리카' }
            ].map(r => `
              <button class="atlas-pill ${this.currentRegion === r.id ? 'active' : ''}" data-region="${r.id}">
                ${r.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Map Projection Banner -->
        <div class="atlas-map-stage">
          <div class="atlas-map-canvas-container" id="atlas-map-canvas">
            <!-- SVG Map Canvas rendered by D3 -->
          </div>
          <div class="atlas-map-overlay-info">
            <span class="atlas-stat-tag">총 <strong>${filteredClusters.length}</strong>개 주요 도시</span>
            <span class="atlas-stat-tag">랜드마크 건축가 <strong>${totalArchitectsCount}</strong>인</span>
            <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">
              * 지도 위 도시 핀이나 아래 도시 카드를 클릭하여 랜드마크를 확인하세요.
            </span>
          </div>
        </div>

        <!-- City Clusters Grid -->
        <div class="atlas-clusters-grid">
          ${filteredClusters.map(cluster => `
            <div class="atlas-city-card ${this.selectedCity === cluster.city ? 'highlight' : ''}" data-city="${cluster.city}">
              <div class="city-card-header">
                <div class="city-name-box">
                  <div class="city-flag-name">
                    <span class="city-icon">📍</span>
                    <h3 class="city-title">${cluster.city}</h3>
                    <span class="city-country">${cluster.country}</span>
                  </div>
                  <span class="city-coords">${cluster.lat.toFixed(2)}°N, ${cluster.lng.toFixed(2)}°E</span>
                </div>
                <span class="city-arch-count">${cluster.architects.length}인</span>
              </div>

              <!-- Masterpieces Showcase in this City -->
              <div class="city-architects-list">
                ${cluster.architects.map(arch => `
                  <div class="city-arch-item jump-arch-btn" data-id="${arch.id}" title="상세 도감 열기">
                    <img src="${arch.portraitImg}" class="city-arch-thumb" alt="${arch.nameKo}" loading="lazy">
                    <div class="city-arch-info">
                      <div class="city-arch-name">
                        <strong>${arch.nameKo}</strong>
                        ${arch.pritzker ? '<span class="pritzker-gold-mini" title="프리츠커상 수상자">🏆 ' + arch.pritzker.year + '</span>' : ''}
                      </div>
                      <div class="city-arch-work">${arch.masterpiece.split(',')[0]}</div>
                    </div>
                    <span class="city-arch-era" style="color: ${this.getEraColor(arch.eraId)};">
                      ${arch.birth}–${arch.death || '현'}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderSvgMap(filteredClusters);
    if (window.lucide) window.lucide.createIcons();
  }

  getEraColor(eraId) {
    const map = {
      'era-pioneers': '#f59e0b',
      'era-masters': '#10b981',
      'era-postwar': '#3b82f6',
      'era-postmodern': '#ec4899',
      'era-contemporary': '#8b5cf6'
    };
    return map[eraId] || '#58a6ff';
  }

  renderSvgMap(clusters) {
    const container = document.getElementById('atlas-map-canvas');
    if (!container || !window.d3) return;

    container.innerHTML = '';
    const width = container.clientWidth || 1200;
    const height = 360;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Map Background with Blueprint Grid
    const defs = svg.append('defs');
    const pattern = defs.append('pattern')
      .attr('id', 'atlas-grid')
      .attr('width', 30)
      .attr('height', 30)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern.append('path')
      .attr('d', 'M 30 0 L 0 0 0 30')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(88, 166, 255, 0.08)')
      .attr('stroke-width', '1');

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#090d13');

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#atlas-grid)');

    // D3 Projection: Natural Earth or Equirectangular
    const projection = d3.geoEquirectangular()
      .scale(width / 6.5)
      .translate([width / 2.05, height / 1.7]);

    // Draw Longitude / Latitude Guide Lines
    const graticule = d3.geoGraticule()
      .step([30, 30]);

    svg.append('path')
      .datum(graticule)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255, 255, 255, 0.04)')
      .attr('stroke-width', 0.8)
      .attr('d', d3.geoPath().projection(projection));

    // City Pins
    const pinGroup = svg.append('g').attr('class', 'atlas-pins');

    clusters.forEach(c => {
      const coords = projection([c.lng, c.lat]);
      if (!coords) return;
      const [x, y] = coords;

      const g = pinGroup.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .attr('class', 'atlas-pin-node')
        .style('cursor', 'pointer');

      // Pulse circle
      g.append('circle')
        .attr('r', 8)
        .attr('fill', 'none')
        .attr('stroke', '#58a6ff')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.6)
        .append('animate')
        .attr('attributeName', 'r')
        .attr('values', '6; 14; 6')
        .attr('dur', '2.5s')
        .attr('repeatCount', 'indefinite');

      // Center dot
      g.append('circle')
        .attr('r', 4.5)
        .attr('fill', '#58a6ff');

      // City Label
      g.append('text')
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#e6edf3')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('font-family', 'var(--font-mono)')
        .text(`${c.city} (${c.architects.length})`);

      // Click to scroll to city card
      g.on('click', () => {
        this.selectedCity = c.city;
        const card = document.querySelector(`.atlas-city-card[data-city="${c.city}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          document.querySelectorAll('.atlas-city-card').forEach(el => el.classList.remove('highlight'));
          card.classList.add('highlight');
        }
      });
    });
  }

  bindEvents() {
    // Region Pills
    this.container.querySelectorAll('.atlas-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentRegion = btn.getAttribute('data-region');
        this.render();
      });
    });

    // Jump to architect
    this.container.querySelectorAll('.jump-arch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const arch = this.architects.find(a => a.id === id);
        if (arch) {
          this.onSelectArchitect(arch);
        }
      });
    });

    // City card click
    this.container.querySelectorAll('.atlas-city-card').forEach(card => {
      card.addEventListener('click', () => {
        this.selectedCity = card.getAttribute('data-city');
        document.querySelectorAll('.atlas-city-card').forEach(el => el.classList.remove('highlight'));
        card.classList.add('highlight');
      });
    });
  }
}

if (typeof window !== 'undefined') {
  window.ArchiAtlas = ArchiAtlas;
}
