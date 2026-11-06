// Main Application Controller (ARCHI-GENEALOGY)

class ArchiApp {
  constructor() {
    this.eras = window.ERAS || [];
    this.architects = [];
    this.edges = [];
    
    this.currentView = localStorage.getItem('archi_last_view') || 'timeline'; // 'timeline' | 'graph' | 'cards'
    this.activeEra = 'all';
    this.selectedArchitect = null;
    
    this.graph = null;
    this.timeline = null;
    this.cards = null;
    this.gallery = null;
    
    this.init();
  }

  init() {
    this.loadData();
    this.setupTheme();
    this.setupViews();
    this.setupSubbar();
    this.setupDrawer();
    this.setupModals();
    this.setupGlobalEvents();
    
    // 5. ArchiStudy (4대 거장 비교, 사조 가이드, 고해상도 도면 라이트박스, 건축사 퀴즈)
    if (window.ArchiStudy) {
      this.study = new ArchiStudy(this);
    }

    // 초기 렌더링 및 뷰 활성화
    this.updateDataViews();
    this.switchView(this.currentView);

    // Lucide Icons 렌더링
    this.refreshIcons();
  }

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {
        console.warn("Lucide icons rendering warning:", e);
      }
    }
  }

  // ========================================================
  // DATA MANAGEMENT & LOCALSTORAGE (v3 100% 로컬 검증 에셋 아카이브)
  // ========================================================
  loadData() {
    const DATA_VERSION = 'archi_architects_v3';
    const EDGES_VERSION = 'archi_edges_v3';

    // 이전 v1, v2의 사용자 작성 커스텀 메모 보존 및 마이그레이션
    const oldNotes = {};
    try {
      const v2 = JSON.parse(localStorage.getItem('archi_architects_v2') || '[]');
      v2.forEach(a => { if (a.customNotes) oldNotes[a.id] = a.customNotes; });
      const v1 = JSON.parse(localStorage.getItem('archi_architects_v1') || '[]');
      v1.forEach(a => { if (a.customNotes && !oldNotes[a.id]) oldNotes[a.id] = a.customNotes; });
    } catch(e) {}

    const savedArchitects = localStorage.getItem(DATA_VERSION);
    const savedEdges = localStorage.getItem(EDGES_VERSION);

    if (savedArchitects) {
      try {
        this.architects = JSON.parse(savedArchitects);
      } catch (e) {
        console.error("Failed to parse saved architects", e);
        this.architects = [...(window.INITIAL_ARCHITECTS || [])];
      }
    } else {
      this.architects = (window.INITIAL_ARCHITECTS || []).map(a => {
        if (oldNotes[a.id]) a.customNotes = oldNotes[a.id];
        return a;
      });
      this.saveData();
    }

    if (savedEdges) {
      try {
        this.edges = JSON.parse(savedEdges);
      } catch (e) {
        console.error("Failed to parse saved edges", e);
        this.edges = [...(window.INFLUENCE_EDGES || [])];
      }
    } else {
      this.edges = [...(window.INFLUENCE_EDGES || [])];
      this.saveData();
    }
  }

  saveData() {
    localStorage.setItem('archi_architects_v3', JSON.stringify(this.architects));
    localStorage.setItem('archi_edges_v3', JSON.stringify(this.edges));
    if (this.study) this.study.updateData(this.architects);
    this.updateDataViews();
  }

  resetToDefault() {
    if (confirm("정말 기본 데이터베이스로 초기화하시겠습니까? 작성한 메모와 새로 추가한 건축가가 모두 초기화됩니다.")) {
      localStorage.removeItem('archi_architects_v1');
      localStorage.removeItem('archi_edges_v1');
      localStorage.removeItem('archi_architects_v2');
      localStorage.removeItem('archi_edges_v2');
      localStorage.removeItem('archi_architects_v3');
      localStorage.removeItem('archi_edges_v3');
      this.architects = [...(window.INITIAL_ARCHITECTS || [])];
      this.edges = [...(window.INFLUENCE_EDGES || [])];
      this.updateDataViews();
      if (this.study) this.study.updateData(this.architects);
      this.showToast("기본 데이터로 성공적으로 초기화되었습니다.");
    }
  }

  // ========================================================
  // VIEW SETUP & SWITCHING
  // ========================================================
  setupViews() {
    // 1. Graph View
    if (window.ArchiGraph) {
      this.graph = new ArchiGraph('view-graph', {
        onSelectArchitect: (arch) => this.openDetailDrawer(arch)
      });
    }

    // 2. Timeline View
    if (window.ArchiTimeline) {
      this.timeline = new ArchiTimeline('view-timeline', {
        onSelectArchitect: (arch) => this.openDetailDrawer(arch)
      });
    }

    // 3. Cards View
    if (window.ArchiCards) {
      this.cards = new ArchiCards('view-cards', {
        onSelectArchitect: (arch) => this.openDetailDrawer(arch)
      });
    }

    // 4. Blueprints & Gallery View
    if (window.ArchiGallery) {
      this.gallery = new ArchiGallery('view-gallery', {
        onSelectArchitect: (arch) => this.openDetailDrawer(arch)
      });
    }

    // View Switching Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Graph Controls
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomReset = document.getElementById('btn-zoom-reset');

    if (btnZoomIn) btnZoomIn.addEventListener('click', () => this.graph && this.graph.zoomBy(1.3));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => this.graph && this.graph.zoomBy(0.7));
    if (btnZoomReset) btnZoomReset.addEventListener('click', () => this.graph && this.graph.resetZoom());
  }

  switchView(viewName) {
    this.currentView = viewName;
    try {
      localStorage.setItem('archi_last_view', viewName);
    } catch (e) {}

    // Tabs UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Container UI
    document.querySelectorAll('.view-container').forEach(c => {
      c.classList.remove('active');
    });

    const activeContainer = document.getElementById(`view-${viewName}`);
    if (activeContainer) {
      activeContainer.classList.add('active');
    }

    if (viewName === 'graph' && this.graph) {
      setTimeout(() => {
        this.graph.resetZoom();
      }, 50);
    }

    if (viewName === 'timeline' && this.timeline) {
      setTimeout(() => {
        this.timeline.onActivate();
      }, 50);
    }

    this.refreshIcons();
  }

  updateDataViews() {
    if (this.graph) this.graph.setData(this.architects, this.edges, this.eras);
    if (this.timeline) this.timeline.setData(this.architects, this.edges, this.eras);
    if (this.cards) this.cards.setData(this.architects, this.edges, this.eras);
    if (this.gallery) this.gallery.setData(this.architects, this.edges, this.eras);
    this.refreshIcons();
  }

  // ========================================================
  // SUBBAR: ERA FILTERS & SEARCH
  // ========================================================
  setupSubbar() {
    const eraContainer = document.getElementById('era-filter-chips');
    if (!eraContainer) return;

    let html = `
      <button class="filter-chip active" data-era="all">
        전체 시대
      </button>
    `;

    this.eras.forEach(era => {
      html += `
        <button class="filter-chip" data-era="${era.id}">
          <span class="chip-dot" style="background: ${era.color};"></span>
          ${era.name}
        </button>
      `;
    });

    eraContainer.innerHTML = html;

    const chips = eraContainer.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const eraId = chip.getAttribute('data-era');
        this.activeEra = eraId;
        if (this.timeline) this.timeline.setFilter(eraId);
        if (this.cards) this.cards.setFilter(eraId);
        if (this.gallery) this.gallery.setFilter(eraId);
      });
    });

    // Search Box
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value;
        if (this.timeline) this.timeline.setSearchQuery(q);
        if (this.cards) this.cards.setSearchQuery(q);
        if (this.gallery) this.gallery.setSearchQuery(q);
      });
    }
  }

  // ========================================================
  // DETAIL DRAWER & NOTES
  // ========================================================
  setupDrawer() {
    this.drawer = document.getElementById('detail-drawer');
    const closeBtn = document.getElementById('btn-close-drawer');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDetailDrawer());
    }

    // Media Tabs in Drawer (인물 / 대표작 / 도면)
    const mediaTabs = document.querySelectorAll('.drawer-media-tab');
    mediaTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        mediaTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const mediaType = tab.getAttribute('data-type');
        this.updateDrawerMedia(mediaType);
      });
    });

    // Notes Save Button & Debounced Auto-Save
    const btnSaveNotes = document.getElementById('btn-save-notes');
    const textarea = document.getElementById('study-notes-text');
    let saveTimeout = null;

    const doSaveNotes = () => {
      if (!this.selectedArchitect || !textarea) return;
      this.selectedArchitect.customNotes = textarea.value;
      this.saveData();
      
      const statusEl = document.getElementById('notes-save-status');
      if (statusEl) {
        statusEl.textContent = "자동 저장됨 ✓";
        statusEl.style.color = "#10b981";
        setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 2500);
      }
    };

    if (btnSaveNotes) {
      btnSaveNotes.addEventListener('click', () => {
        doSaveNotes();
        this.showToast("학습 노트가 저장되었습니다.");
      });
    }

    if (textarea) {
      textarea.addEventListener('input', () => {
        const statusEl = document.getElementById('notes-save-status');
        if (statusEl) {
          statusEl.textContent = "작성 중...";
          statusEl.style.color = "var(--text-muted)";
        }
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(doSaveNotes, 800);
      });
    }

    // View on Graph from Drawer
    const btnLocateGraph = document.getElementById('btn-locate-graph');
    if (btnLocateGraph) {
      btnLocateGraph.addEventListener('click', () => {
        if (!this.selectedArchitect) return;
        this.switchView('graph');
        if (this.graph) this.graph.focusArchitect(this.selectedArchitect.id);
      });
    }
  }

  updateDrawerMedia(type) {
    if (!this.selectedArchitect) return;
    const arch = this.selectedArchitect;
    const imgEl = document.getElementById('drawer-media-img');
    const captionTitle = document.getElementById('drawer-media-caption-title');
    const captionTag = document.getElementById('drawer-media-caption-tag');
    if (!imgEl) return;

    this.currentDrawerMediaType = type;
    imgEl.style.cursor = 'zoom-in';

    if (type === 'portrait') {
      imgEl.src = arch.portraitImg;
      if (captionTitle) captionTitle.textContent = `${arch.nameKo} (${arch.nameEn})`;
      if (captionTag) captionTag.textContent = "🔍 클릭하여 고해상도로 확대";
    } else if (type === 'building') {
      imgEl.src = arch.buildingImg;
      if (captionTitle) captionTitle.textContent = arch.masterpiece.split(',')[0];
      if (captionTag) captionTag.textContent = "🔍 클릭하여 고해상도로 확대";
    } else if (type === 'blueprint') {
      imgEl.src = arch.blueprintImg;
      if (captionTitle) captionTitle.textContent = `${arch.nameKo} - ${arch.blueprintType || '대표작 설계 도면'}`;
      if (captionTag) captionTag.textContent = "📐 클릭하여 고해상도 도면 돋보기로 보기";
    }

    imgEl.onclick = () => {
      if (this.study) {
        let title = `${arch.nameKo} - `;
        let drawType = "건축 사진";
        let desc = arch.desc;
        let url = arch.buildingImg;

        if (this.currentDrawerMediaType === 'blueprint') {
          title += arch.blueprintType || "설계 평면도";
          drawType = arch.blueprintType || "평면도";
          desc = arch.blueprintDesc || arch.desc;
          url = arch.blueprintImg;
        } else if (this.currentDrawerMediaType === 'portrait') {
          title += "공식 인물 초상화";
          drawType = "인물 사진";
          desc = `${arch.nameKo} (${arch.birth}–${arch.death || '현재'}) · ${arch.movement}`;
          url = arch.portraitImg;
        } else {
          title += arch.masterpiece.split(',')[0];
          drawType = "대표 건축물";
          desc = `대표작: ${arch.masterpiece}. ${arch.desc}`;
          url = arch.buildingImg;
        }

        this.study.openBlueprint(arch, url, title, drawType, desc);
      }
    };
  }

  openDetailDrawer(architect) {
    this.selectedArchitect = architect;
    const drawer = this.drawer;
    if (!drawer) return;

    const era = this.eras.find(e => e.id === architect.eraId) || { name: "", color: "#58a6ff" };
    const lifespan = architect.death ? `${architect.birth} – ${architect.death}` : `${architect.birth} – 현재`;

    const eraBadge = document.getElementById('drawer-era-badge');
    eraBadge.textContent = era.name;
    eraBadge.style.backgroundColor = era.color;

    document.getElementById('drawer-name-ko').textContent = architect.nameKo;
    document.getElementById('drawer-name-en').textContent = `${architect.nameEn} · ${architect.country} (${lifespan})`;

    // 미디어 기본 탭 초기화 (인물 사진 우선)
    document.querySelectorAll('.drawer-media-tab').forEach(t => t.classList.remove('active'));
    const defaultTab = document.getElementById('tab-media-portrait');
    if (defaultTab) defaultTab.classList.add('active');
    this.updateDrawerMedia('portrait');

    document.getElementById('drawer-movement').textContent = architect.movement;
    
    const quoteBox = document.getElementById('drawer-quote-box');
    if (architect.quote) {
      quoteBox.style.display = 'block';
      quoteBox.textContent = `"${architect.quote}"`;
    } else {
      quoteBox.style.display = 'none';
    }

    // 역사적 비화 & 학술 해설
    const anecdoteEl = document.getElementById('drawer-anecdote-text');
    if (anecdoteEl) {
      anecdoteEl.textContent = architect.anecdote || `${architect.nameKo} 건축가는 근현대 건축사의 중요한 변곡점을 이끈 핵심 인물입니다.`;
    }

    document.getElementById('drawer-desc').textContent = architect.desc || "상세 설명이 아직 등록되지 않았습니다.";
    document.getElementById('drawer-masterpiece').textContent = architect.masterpiece || "대표작이 아직 등록되지 않았습니다.";

    // 주요 대표작 목록
    const keyworksEl = document.getElementById('drawer-keyworks-list');
    if (keyworksEl) {
      const works = architect.keyWorks && architect.keyWorks.length > 0
        ? architect.keyWorks
        : [{ name: architect.masterpiece.split(',')[0], year: architect.birth + 40, location: architect.country, desc: "대표적인 건축 기념물" }];
      
      keyworksEl.innerHTML = works.map(w => `
        <div class="keywork-item">
          <div class="keywork-header">
            <span class="keywork-title">🏛️ ${w.name}</span>
            <span class="keywork-meta">${w.year ? w.year + '년' : ''} · ${w.location || ''}</span>
          </div>
          <div class="keywork-desc">${w.desc || ''}</div>
        </div>
      `).join("");
    }

    const teachersList = this.edges
      .filter(e => e.to === architect.id)
      .map(e => {
        const t = this.architects.find(a => a.id === e.from);
        return {
          id: e.from,
          name: t ? t.nameKo : e.from,
          type: e.type,
          label: e.label
        };
      });

    const teacherChipsEl = document.getElementById('drawer-teachers-chips');
    if (teachersList.length === 0) {
      teacherChipsEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">등록된 직속 스승/선행 영향 정보 없음</span>`;
    } else {
      teacherChipsEl.innerHTML = teachersList.map(t => `
        <button class="relation-chip jump-architect-btn" data-id="${t.id}" title="${t.label || ''}">
          <span>${t.name}</span>
          <span style="font-size: 0.7rem; color: var(--text-secondary);">(${t.label || '영향'})</span>
        </button>
      `).join("");
    }

    const disciplesList = this.edges
      .filter(e => e.from === architect.id)
      .map(e => {
        const d = this.architects.find(a => a.id === e.to);
        return {
          id: e.to,
          name: d ? d.nameKo : e.to,
          type: e.type,
          label: e.label
        };
      });

    const discipleChipsEl = document.getElementById('drawer-disciples-chips');
    if (disciplesList.length === 0) {
      discipleChipsEl.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">등록된 직속 제자/후대 영향 정보 없음</span>`;
    } else {
      discipleChipsEl.innerHTML = disciplesList.map(d => `
        <button class="relation-chip jump-architect-btn" data-id="${d.id}" title="${d.label || ''}">
          <span>${d.name}</span>
          <span style="font-size: 0.7rem; color: var(--text-secondary);">(${d.label || '사사/영향'})</span>
        </button>
      `).join("");
    }

    const tagsEl = document.getElementById('drawer-tags');
    tagsEl.innerHTML = (architect.tags || []).map(t => `
      <span class="tag-pill" style="font-size: 0.78rem;">#${t}</span>
    `).join("");

    const notesText = document.getElementById('study-notes-text');
    notesText.value = architect.customNotes || "";
    document.getElementById('notes-save-status').textContent = "";

    drawer.querySelectorAll('.jump-architect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-id');
        const targetArch = this.architects.find(a => a.id === targetId);
        if (targetArch) {
          this.openDetailDrawer(targetArch);
          if (this.currentView === 'graph' && this.graph) {
            this.graph.focusArchitect(targetId);
          }
        }
      });
    });

    drawer.classList.add('open');
    this.refreshIcons();
  }

  closeDetailDrawer() {
    if (this.drawer) {
      this.drawer.classList.remove('open');
    }
    if (this.graph) {
      this.graph.clearSelection();
    }
  }

  // ========================================================
  // MODALS (ADD ARCHITECT & BACKUP/IMPORT)
  // ========================================================
  setupModals() {
    const modalAdd = document.getElementById('modal-add-architect');
    const btnOpenAdd = document.getElementById('btn-open-add-modal');
    const btnCloseAdd = document.getElementById('btn-close-add-modal');
    const formAdd = document.getElementById('form-add-architect');

    if (btnOpenAdd) {
      btnOpenAdd.addEventListener('click', () => {
        this.populateMentorSelect();
        modalAdd.classList.add('open');
      });
    }

    if (btnCloseAdd) {
      btnCloseAdd.addEventListener('click', () => modalAdd.classList.remove('open'));
    }

    if (formAdd) {
      formAdd.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddArchitect(formAdd);
        modalAdd.classList.remove('open');
      });
    }

    const modalBackup = document.getElementById('modal-backup');
    const btnOpenBackup = document.getElementById('btn-open-backup-modal');
    const btnCloseBackup = document.getElementById('btn-close-backup-modal');
    const btnExportJson = document.getElementById('btn-export-json');
    const inputImportJson = document.getElementById('input-import-json');
    const btnResetData = document.getElementById('btn-reset-data');

    if (btnOpenBackup) {
      btnOpenBackup.addEventListener('click', () => modalBackup.classList.add('open'));
    }
    if (btnCloseBackup) {
      btnCloseBackup.addEventListener('click', () => modalBackup.classList.remove('open'));
    }

    if (btnExportJson) {
      btnExportJson.addEventListener('click', () => this.exportBackupJson());
    }

    if (inputImportJson) {
      inputImportJson.addEventListener('change', (e) => this.importBackupJson(e));
    }

    if (btnResetData) {
      btnResetData.addEventListener('click', () => this.resetToDefault());
    }
  }

  populateMentorSelect() {
    const select = document.getElementById('input-mentor-id');
    if (!select) return;

    select.innerHTML = `
      <option value="">(선택 안함 / 직접적인 스승 없음)</option>
      ${this.architects.map(a => `
        <option value="${a.id}">${a.nameKo} (${a.nameEn})</option>
      `).join("")}
    `;
  }

  handleAddArchitect(form) {
    const nameKo = form.nameKo.value.trim();
    const nameEn = form.nameEn.value.trim();
    const birth = parseInt(form.birth.value, 10);
    const death = form.death.value ? parseInt(form.death.value, 10) : null;
    const country = form.country.value.trim();
    const eraId = form.eraId.value;
    const movement = form.movement.value.trim();
    const quote = form.quote.value.trim();
    const masterpiece = form.masterpiece.value.trim();
    const desc = form.desc.value.trim();
    const tags = form.tags.value.split(',').map(t => t.trim()).filter(Boolean);
    const mentorId = form.mentorId.value;
    const mentorLabel = form.mentorLabel.value.trim() || "사제 관계 / 영향";

    if (!nameKo || isNaN(birth)) {
      alert("한글 이름과 출생연도는 필수 항목입니다.");
      return;
    }

    const cleanId = nameEn.toLowerCase().replace(/[^a-z0-9]/g, '-') || `arch-${Date.now()}`;
    const id = cleanId;

    const newArchitect = {
      id,
      nameKo,
      nameEn: nameEn || nameKo,
      birth,
      death,
      country: country || "미상",
      eraId,
      movement: movement || "현대 건축",
      quote,
      desc: desc || "새로 추가된 건축가입니다.",
      masterpiece,
      tags: tags.length ? tags : ["건축가"],
      customNotes: ""
    };

    this.architects.push(newArchitect);

    if (mentorId) {
      this.edges.push({
        from: mentorId,
        to: id,
        type: "master-disciple",
        label: mentorLabel
      });
    }

    this.saveData();
    form.reset();
    this.showToast(`${nameKo} 건축가가 성공적으로 추가되었습니다!`);
    this.openDetailDrawer(newArchitect);
  }

  exportBackupJson() {
    const data = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      architects: this.architects,
      edges: this.edges
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `건축가_계보_백업_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast("백업 JSON 파일이 다운로드되었습니다.");
  }

  importBackupJson(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported.architects)) {
          this.architects = imported.architects;
          if (Array.isArray(imported.edges)) {
            this.edges = imported.edges;
          }
          this.saveData();
          this.showToast("데이터를 성공적으로 복원했습니다!");
          document.getElementById('modal-backup').classList.remove('open');
        } else {
          alert("올바르지 않은 백업 파일 형식입니다.");
        }
      } catch (err) {
        alert("JSON 파싱 에러: 파일이 손상되었거나 형식이 맞지 않습니다.");
      }
    };
    reader.readAsText(file);
  }

  // ========================================================
  // THEME & UTILITIES
  // ========================================================
  setupTheme() {
    const savedTheme = localStorage.getItem('archi_theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }

    const themeToggleBtn = document.getElementById('btn-toggle-theme');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('archi_theme', isLight ? 'light' : 'dark');
      });
    }
  }

  setupGlobalEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDetailDrawer();
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      }
    });
  }

  showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// 스크립트 실행 시점 안전 보장
function launchArchiApp() {
  if (!window.app) {
    window.app = new ArchiApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchArchiApp);
} else {
  launchArchiApp();
}
