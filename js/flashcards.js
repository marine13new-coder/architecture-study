// ========================================================
// ARCHI-FLASHCARDS: 3D Spaced Repetition (SRS) Exam Flashcard Studio
// 건축사 자격증 및 학술 암기 대비 3D 플립 플래시카드 워크스테이션
// ========================================================

class ArchiFlashcards {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.onSelectArchitect = options.onSelectArchitect || (() => {});
    this.architects = [];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.mode = 'visual'; // 'visual' | 'quote' | 'books'
    this.masteredIds = new Set();
    this.loadState();
  }

  loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem('archi_flashcards_mastered') || '[]');
      this.masteredIds = new Set(saved);
    } catch(e) {}
  }

  saveState() {
    try {
      localStorage.setItem('archi_flashcards_mastered', JSON.stringify(Array.from(this.masteredIds)));
    } catch(e) {}
  }

  setData(architects, edges, eras) {
    this.architects = architects || [];
    this.render();
  }

  getCurrentCard() {
    if (!this.architects || this.architects.length === 0) return null;
    return this.architects[this.currentIndex % this.architects.length];
  }

  nextCard() {
    this.isFlipped = false;
    this.currentIndex = (this.currentIndex + 1) % this.architects.length;
    this.render();
  }

  prevCard() {
    this.isFlipped = false;
    this.currentIndex = (this.currentIndex - 1 + this.architects.length) % this.architects.length;
    this.render();
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
    const cardEl = this.container.querySelector('.flashcard-inner');
    if (cardEl) {
      cardEl.classList.toggle('flipped', this.isFlipped);
    }
  }

  markMastered(id) {
    this.masteredIds.add(id);
    this.saveState();
    this.nextCard();
  }

  markReview(id) {
    this.masteredIds.delete(id);
    this.saveState();
    this.nextCard();
  }

  resetProgress() {
    if (confirm("플래시카드 암기 진행도를 초기화하시겠습니까?")) {
      this.masteredIds.clear();
      this.saveState();
      this.currentIndex = 0;
      this.isFlipped = false;
      this.render();
    }
  }

  render() {
    if (!this.container) return;
    const arch = this.getCurrentCard();
    if (!arch) return;

    const total = this.architects.length;
    const masteredCount = this.masteredIds.size;
    const progressPercent = Math.round((masteredCount / total) * 100);
    const isMastered = this.masteredIds.has(arch.id);

    // Front content according to mode
    let frontHtml = '';
    if (this.mode === 'visual') {
      const showBlueprint = this.currentIndex % 2 === 1;
      const mediaImg = showBlueprint ? arch.blueprintImg : arch.buildingImg;
      const mediaLabel = showBlueprint ? (arch.blueprintType || '설계 도면') : '대표 건축물';

      frontHtml = `
        <div class="fc-front-box">
          <span class="fc-tag-badge">🏛️ ${mediaLabel}로 건축가 맞추기</span>
          <div class="fc-media-container">
            <img src="${mediaImg}" class="fc-media-img" alt="Quiz Visual">
          </div>
          <div class="fc-hint">💡 이 대표작 및 도면을 설계한 거장은 누구일까요?</div>
          <div class="fc-click-hint">스페이스바 또는 카드를 클릭하여 정답 확인</div>
        </div>
      `;
    } else if (this.mode === 'quote') {
      frontHtml = `
        <div class="fc-front-box">
          <span class="fc-tag-badge">💬 건축 철학 & 슬로건 매칭</span>
          <div class="fc-quote-display">
            "${arch.quote}"
          </div>
          <div class="fc-keywords-row">
            ${(arch.philosophyKeywords || []).map(k => `<span class="tag-pill">#${k}</span>`).join('')}
          </div>
          <div class="fc-hint">💡 위 핵심 명제와 사상을 주창한 거장은 누구일까요?</div>
          <div class="fc-click-hint">스페이스바 또는 카드를 클릭하여 정답 확인</div>
        </div>
      `;
    } else {
      // Books & Pritzker mode
      const book = (arch.majorBooks && arch.majorBooks[0]) || { titleKo: "대표 저작 및 선언문", desc: arch.desc };
      frontHtml = `
        <div class="fc-front-box">
          <span class="fc-tag-badge">📚 주요 저서 & 프리츠커 족보</span>
          <div class="fc-book-card">
            <div class="fc-book-title">📖 『${book.titleKo}』</div>
            <p class="fc-book-desc">${book.desc}</p>
          </div>
          ${arch.pritzker ? `<div class="fc-pritzker-hint">🏆 ${arch.pritzker.year}년 프리츠커상 수상자</div>` : ''}
          <div class="fc-hint">💡 이 명저와 이론을 저술한 건축가는 누구일까요?</div>
          <div class="fc-click-hint">스페이스바 또는 카드를 클릭하여 정답 확인</div>
        </div>
      `;
    }

    // Back content (Complete Academic Solution)
    const backHtml = `
      <div class="fc-back-box">
        <div class="fc-back-profile">
          <img src="${arch.portraitImg}" class="fc-avatar" alt="${arch.nameKo}">
          <div>
            <div class="fc-name-ko">${arch.nameKo}</div>
            <div class="fc-name-en">${arch.nameEn} · ${arch.country}</div>
            <div class="fc-lifespan">${arch.birth} – ${arch.death || '현재'} · <span style="color: var(--text-accent);">${arch.movement}</span></div>
          </div>
          ${arch.pritzker ? `<span class="fc-pritzker-gold">🏆 Pritzker ${arch.pritzker.year}</span>` : ''}
        </div>

        <div class="fc-back-details">
          <div class="fc-detail-row">
            <span class="fc-label">🏛️ 대표 걸작:</span>
            <span class="fc-val"><strong>${arch.masterpiece}</strong></span>
          </div>

          <div class="fc-detail-row">
            <span class="fc-label">💬 핵심 명언:</span>
            <span class="fc-val" style="color: #fbbf24; font-style: italic;">"${arch.quote}"</span>
          </div>

          <div class="fc-detail-row">
            <span class="fc-label">📐 구법 & 재료:</span>
            <span class="fc-val">${(arch.tectonicMaterials || []).join(' · ') || '철근 콘크리트 및 구조 엔지니어링'}</span>
          </div>

          <div class="fc-detail-row">
            <span class="fc-label">📚 대표 저작:</span>
            <span class="fc-val">${(arch.majorBooks || []).map(b => `『${b.titleKo}』(${b.year}년)`).join(', ') || '사조 선언문집'}</span>
          </div>

          <div class="fc-detail-desc">
            ${arch.desc}
          </div>
        </div>

        <button class="btn btn-sm jump-arch-btn" data-id="${arch.id}" style="margin-top: 10px; width: 100%; justify-content: center;">
          <i data-lucide="book-open"></i>
          <span>상세 아카이브 도감 열기</span>
        </button>
      </div>
    `;

    this.container.innerHTML = `
      <div class="flashcards-wrapper">
        <!-- Top Toolbar -->
        <div class="fc-toolbar">
          <div class="fc-modes">
            <button class="fc-mode-btn ${this.mode === 'visual' ? 'active' : ''}" data-mode="visual">
              🏛️ 도면·건물 시각 암기
            </button>
            <button class="fc-mode-btn ${this.mode === 'quote' ? 'active' : ''}" data-mode="quote">
              💬 명언·철학 매칭
            </button>
            <button class="fc-mode-btn ${this.mode === 'books' ? 'active' : ''}" data-mode="books">
              📚 저서·프리츠커 족보
            </button>
          </div>

          <div class="fc-stats">
            <span class="fc-counter">진행: <strong>${this.currentIndex + 1}</strong> / ${total}</span>
            <div class="fc-progress-bar">
              <div class="fc-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
            <span class="fc-mastered-badge">완벽 숙지 🔥 <strong>${masteredCount}</strong></span>
            <button class="btn-icon" id="btn-reset-srs" title="암기 진행도 초기화"><i data-lucide="rotate-ccw"></i></button>
          </div>
        </div>

        <!-- 3D Card Stage -->
        <div class="fc-card-stage" id="fc-stage">
          <div class="flashcard-inner ${this.isFlipped ? 'flipped' : ''}">
            <div class="flashcard-face flashcard-front">
              ${frontHtml}
            </div>
            <div class="flashcard-face flashcard-back">
              ${backHtml}
            </div>
          </div>
        </div>

        <!-- Navigation & SRS Rating Controls -->
        <div class="fc-controls">
          <button class="btn" id="btn-fc-prev" title="이전 카드 (← 방향키)">
            <i data-lucide="chevron-left"></i>
            <span>이전</span>
          </button>

          <button class="btn btn-primary btn-flip-action" id="btn-fc-flip" title="카드 뒤집기 (Space)">
            <i data-lucide="rotate-3d"></i>
            <span>${this.isFlipped ? '질문 보기 (앞면)' : '정답 확인 (뒷면)'}</span>
          </button>

          <button class="btn" id="btn-fc-next" title="다음 카드 (→ 방향키)">
            <span>다음</span>
            <i data-lucide="chevron-right"></i>
          </button>
        </div>

        <!-- Spaced Repetition Action Bar -->
        <div class="fc-srs-bar">
          <button class="srs-btn srs-hard" id="btn-srs-hard" title="다시 복습하기">
            <span>🔴 아직 헷갈림 (Hard)</span>
          </button>
          <button class="srs-btn srs-easy ${isMastered ? 'active' : ''}" id="btn-srs-easy" title="완벽히 암기함">
            <span>🟢 완벽 숙지 완료 (Mastered)</span>
          </button>
        </div>
      </div>
    `;

    this.bindEvents(arch.id);
    if (window.lucide) window.lucide.createIcons();
  }

  bindEvents(currentId) {
    // Stage click flips card
    const stage = document.getElementById('fc-stage');
    if (stage) {
      stage.addEventListener('click', (e) => {
        if (!e.target.closest('.jump-arch-btn')) {
          this.toggleFlip();
        }
      });
    }

    // Flip button
    const btnFlip = document.getElementById('btn-fc-flip');
    if (btnFlip) btnFlip.addEventListener('click', () => this.toggleFlip());

    // Prev / Next
    const btnPrev = document.getElementById('btn-fc-prev');
    if (btnPrev) btnPrev.addEventListener('click', () => this.prevCard());

    const btnNext = document.getElementById('btn-fc-next');
    if (btnNext) btnNext.addEventListener('click', () => this.nextCard());

    // SRS buttons
    const btnHard = document.getElementById('btn-srs-hard');
    if (btnHard) btnHard.addEventListener('click', () => this.markReview(currentId));

    const btnEasy = document.getElementById('btn-srs-easy');
    if (btnEasy) btnEasy.addEventListener('click', () => this.markMastered(currentId));

    // Reset
    const btnReset = document.getElementById('btn-reset-srs');
    if (btnReset) btnReset.addEventListener('click', () => this.resetProgress());

    // Modes
    this.container.querySelectorAll('.fc-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.mode = btn.getAttribute('data-mode');
        this.isFlipped = false;
        this.render();
      });
    });

    // Jump to architect
    this.container.querySelectorAll('.jump-arch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const arch = this.architects.find(a => a.id === currentId);
        if (arch) this.onSelectArchitect(arch);
      });
    });

    // Keyboard controls
    if (!this.keyboardBound) {
      this.keyboardBound = true;
      window.addEventListener('keydown', (e) => {
        const fcView = document.getElementById('view-flashcards');
        if (!fcView || !fcView.classList.contains('active')) return;

        if (e.code === 'Space') {
          e.preventDefault();
          this.toggleFlip();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.nextCard();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prevCard();
        } else if (e.key === '1') {
          this.markReview(currentId);
        } else if (e.key === '2' || e.key === '3') {
          this.markMastered(currentId);
        }
      });
    }
  }
}

if (typeof window !== 'undefined') {
  window.ArchiFlashcards = ArchiFlashcards;
}
