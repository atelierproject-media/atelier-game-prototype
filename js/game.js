
(() => {
  'use strict';

  const LANG_KEY = 'lse320_language';
  const PLAYER_ID = 'usr_lse320_01';
  const CHAPTER_FILES = [
    'c01_tools','c02_shapes','c03_transformation_editing',
    'c04_color_gradient_appearance','c05_graph_canvas_navigation',
    'c06_essential_shortcuts'
  ];
  const I18N = {
    th: {
      progress:'ATELIER · LEARNING STUDIO', chooseLanguage:'เลือกภาษาที่ต้องการ',
      languageHint:'คุณสามารถเปลี่ยนภาษาได้จากหน้าแรกหรือหน้าเลือกบทเรียน',
      thai:'ภาษาไทย', english:'English', homeEyebrow:'WELCOME TO',
      homeTitle:'ATELIER', homeText:'เรียนรู้เครื่องมือ Adobe Illustrator ผ่านภารกิจสั้น ๆ ในห้องออกแบบแฟชั่น',
      start:'เริ่มต้นเรียนรู้', chooseChapter:'เลือก Chapter ที่ต้องการฝึก',
      chapterHint:'เลือกบทเรียนเพื่อเรียนรู้เครื่องมือและทำภารกิจจับคู่',
      back:'ย้อนกลับ', changeLanguage:'เปลี่ยนภาษา', chapter:'CHAPTER',
      learningObjectives:'เป้าหมายการเรียนรู้', beginLesson:'เริ่มบทเรียน',
      toolReview:'ทบทวนเครื่องมือ', matchingIntro:'ภารกิจจับคู่',
      matchingInstruction:'จับคู่ชื่อเครื่องมือทางซ้ายกับหน้าที่ที่ถูกต้องทางขวา สามารถลากวางหรือคลิกเลือกทีละคู่',
      tools:'เครื่องมือ', functions:'หน้าที่', attempts:'จำนวนครั้งที่ลอง',
      correct:'ถูกต้อง!', incorrect:'ยังไม่ถูกต้อง', revealed:'เปิดเฉลย',
      tryAgain:'ลองอีกครั้ง', attemptsLeft:'ครั้งที่เหลือ', continue:'ดำเนินการต่อ',
      viewResults:'ดูผลลัพธ์', result:'สรุปผลภารกิจ', completed:'จับคู่สำเร็จ',
      flawless:'ตอบถูกตั้งแต่ครั้งแรก', wrongAttempts:'จำนวนครั้งที่ตอบผิด',
      revealedCount:'จำนวนข้อที่เปิดเฉลย', replay:'ฝึกบทนี้อีกครั้ง',
      chapters:'กลับไปเลือก Chapter', allDone:'ทำภารกิจเสร็จแล้ว',
      noShortcut:'ไม่มี Shortcut ระบุในชุดข้อมูล', selectTool:'เลือกเครื่องมือก่อน',
      selected:'เลือกแล้ว', matched:'จับคู่แล้ว', dropHere:'วางหรือคลิกจับคู่ที่นี่',
      preview:'โหมด Preview — ไม่บันทึก Learning Records',
      loading:'กำลังโหลดเนื้อหา...', loadError:'ไม่สามารถโหลดบทเรียนได้',
      missing:'ไม่พบข้อมูล Chapter นี้', startOver:'กลับหน้าแรก',
      chapterDone:'บทเรียนนี้เสร็จสมบูรณ์', item:'รายการ',
      attemptOf:'ครั้งที่', reviewFirst:'ทบทวนเนื้อหาให้พร้อมก่อนเริ่มจับคู่',
      progressLabel:'ความคืบหน้า', roundNotice:'สุ่มโจทย์ที่ยังไม่ผ่านจากคลังคำถามของบทนี้', chapterProgress:'ความคืบหน้าของบทเรียน', remaining:'ข้อที่เหลือ', totalQuestions:'จำนวนข้อทั้งหมด', inProgress:'กำลังเรียน', notStarted:'ยังไม่เริ่ม', chapterCompleted:'เรียนครบแล้ว', continueRound:'ทำภารกิจรอบถัดไป', allQuestionsDone:'คุณทำโจทย์ครบทุกข้อในบทนี้แล้ว', roundComplete:'จบรอบการฝึก',
      chooseActivity:'เลือกภารกิจ', matchingMode:'จับคู่เครื่องมือกับหน้าที่',
      scenarioMode:'เลือกเครื่องมือจากสถานการณ์', scenarioInstruction:'อ่านสถานการณ์และเลือกเครื่องมือ Illustrator ที่เหมาะสมที่สุดจาก 4 ตัวเลือก',
      scenarioQuestion:'สถานการณ์', nextQuestion:'ข้อต่อไป', scenarioCorrect:'ถูกต้อง! เลือกเครื่องมือได้เหมาะสมกับสถานการณ์',
      scenarioIncorrect:'ยังไม่ถูกต้อง ลองสังเกตสิ่งที่โจทย์ต้องการทำ', scenarioResult:'ผลภารกิจสถานการณ์',
      scenarioScore:'ตอบถูก', of:'จาก'
    },
    en: {
      progress:'ATELIER · LEARNING STUDIO', chooseLanguage:'Choose your language',
      languageHint:'You can change the language from Home or Chapter Selection.',
      thai:'ภาษาไทย', english:'English', homeEyebrow:'WELCOME TO',
      homeTitle:'ATELIER', homeText:'Learn Adobe Illustrator tools through short missions in a fashion design studio.',
      start:'Start Learning', chooseChapter:'Choose a chapter to practice',
      chapterHint:'Select a lesson to review tools and complete a matching mission.',
      back:'Back', changeLanguage:'Change language', chapter:'CHAPTER',
      learningObjectives:'Learning objectives', beginLesson:'Begin lesson',
      toolReview:'Tool Review', matchingIntro:'Matching Challenge',
      matchingInstruction:'Match each tool on the left with its correct function on the right. Drag and drop or click one item on each side.',
      tools:'Tools', functions:'Functions', attempts:'Attempts',
      correct:'Correct!', incorrect:'Not quite', revealed:'Answer revealed',
      tryAgain:'Try again', attemptsLeft:'attempts left', continue:'Continue',
      viewResults:'View Results', result:'Mission Results', completed:'Matches completed',
      flawless:'Correct on first attempt', wrongAttempts:'Incorrect attempts',
      revealedCount:'Answers revealed', replay:'Replay this chapter',
      chapters:'Back to Chapters', allDone:'Mission completed',
      noShortcut:'No shortcut specified', selectTool:'Select a tool first',
      selected:'Selected', matched:'Matched', dropHere:'Drop or click to match here',
      preview:'Preview mode — Learning Records are not saved',
      loading:'Loading lesson...', loadError:'Unable to load lesson',
      missing:'Chapter data not found', startOver:'Back to Home',
      chapterDone:'Chapter completed', item:'Item',
      attemptOf:'Attempt', reviewFirst:'Review the content before starting the matching challenge.',
      progressLabel:'Progress', roundNotice:'Questions not yet completed are selected from this chapter’s full question bank.', chapterProgress:'Chapter learning progress', remaining:'remaining', totalQuestions:'total questions', inProgress:'In progress', notStarted:'Not started', chapterCompleted:'Completed', continueRound:'Continue to next round', allQuestionsDone:'You have completed every question in this chapter.', roundComplete:'Practice round complete',
      chooseActivity:'Choose a mission', matchingMode:'Match tools with their functions',
      scenarioMode:'Choose a tool for a situation', scenarioInstruction:'Read the situation and choose the most suitable Illustrator tool from four options.',
      scenarioQuestion:'Situation', nextQuestion:'Next question', scenarioCorrect:'Correct! That tool fits the situation.',
      scenarioIncorrect:'Not quite. Look carefully at what the task requires.', scenarioResult:'Scenario Mission Results',
      scenarioScore:'Correct answers', of:'of'
    }
  };

  const app = document.getElementById('app-container');
  const progressLabel = document.getElementById('progress-text');
  const langButton = document.getElementById('language-toggle');
  const previewMode = new URLSearchParams(location.search).get('preview') === 'true';
  let lang = localStorage.getItem(LANG_KEY) || 'th';
  if (!['th','en'].includes(lang)) lang = 'th';

  let chapters = [];
  let activeChapter = null;
  let attemptId = null;
  let screen = 'language';
  let pairAttempts = {};
  let matchedIds = new Set();
  let revealedIds = new Set();
  let selectedToolId = null;
  let stats = freshStats();
  let pairStart = 0;
  let attemptStartedAt = Date.now();
  let lastFeedback = null;
  let roundPairs = [];
  let matchingRoundsPlayed = 0;
  const sessionCompletedPairIds = {};
  let lastChoice = null;
  let scenarioIndex = 0;
  let scenarioPool = [];
  let scenarioCorrect = 0;
  let scenarioWrong = 0;
  let scenarioAttempts = {};
  let scenarioOptions = {};
  let scenarioResolved = {};
  let keyboardTasks = [];
  let keyboardIndex = 0;
  let keyboardWrong = 0;
  let keyboardAttempts = {};
  let keyboardResolved = {};
  let virtualModifiers = new Set();
  let keyboardCorrect = 0;
  let keyboardPhysicalHandler = null;

  function freshStats() {
    return { firstTimeCorrect:0, totalCorrect:0, totalRevealed:0, totalIncorrectAttempts:0 };
  }
  const t = key => (I18N[lang] && I18N[lang][key]) || key;
  const localized = value => {
    if (value && typeof value === 'object') return value[lang] || '';
    return value == null ? '' : String(value);
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const shuffle = arr => {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  // Wix HTML Component bridge. Local standalone testing remains supported.
  const isWixEmbedded = window.parent !== window;
  const wixPendingRequests = new Map();
  let wixRequestSequence = 0;
  let wixWriteQueue = Promise.resolve();
  const remoteProgressCache = Object.create(null);

  window.addEventListener('message', event => {
    const message = event.data;
    if (!message || message.channel !== 'ATELIER_WIX' || message.kind !== 'response') return;
    const pending = wixPendingRequests.get(message.requestId);
    if (!pending) return;
    window.clearTimeout(pending.timer);
    wixPendingRequests.delete(message.requestId);
    if (message.ok) pending.resolve(message.data);
    else pending.reject(new Error(message.error || 'WIX_BACKEND_ERROR'));
  });

  function callWixBackend(method, payload = {}) {
    if (!isWixEmbedded) return Promise.reject(new Error('WIX_BRIDGE_UNAVAILABLE'));
    const requestId = `atelier_${Date.now()}_${++wixRequestSequence}`;
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        wixPendingRequests.delete(requestId);
        reject(new Error('WIX_REQUEST_TIMEOUT'));
      }, 15000);
      wixPendingRequests.set(requestId, { resolve, reject, timer });
      window.parent.postMessage({
        channel: 'ATELIER_WIX',
        kind: 'request',
        requestId,
        method,
        payload
      }, '*');
    });
  }

  function queueWixWrite(method, payload) {
    if (!isWixEmbedded || previewMode) return Promise.resolve(null);
    wixWriteQueue = wixWriteQueue
      .then(() => callWixBackend(method, payload))
      .catch(error => {
        console.warn('[ATELIER Wix Sync]', method, error?.message || error);
        return null;
      });
    return wixWriteQueue;
  }

  async function refreshRemoteProgress() {
    if (!isWixEmbedded || previewMode || !chapters.length) return;
    const results = await Promise.all(chapters.map(async chapter => {
      try {
        const result = await callWixBackend('getChapterProgress', { chapterId: chapter.id });
        return { chapterId: chapter.id, result };
      } catch (_) {
        return null;
      }
    }));
    let changed = false;
    results.forEach(entry => {
      if (!entry?.result) return;
      remoteProgressCache[entry.chapterId] = entry.result;
      changed = true;
    });
    if (changed && screen === 'chapters') renderChapterSelection();
  }

  function sendRemoteAttemptStart() {
    if (!isWixEmbedded || previewMode || !activeChapter || !attemptId) return;
    queueWixWrite('startAttempt', {
      attemptId,
      chapterId: activeChapter.id,
      contentVersion: activeChapter.contentVersion || 1,
      mode: 'matching',
      totalQuestions: (activeChapter.matching?.pairs || []).length
    });
  }

  async function loadAllChapters() {
    const loaded = await Promise.all(CHAPTER_FILES.map(async id => {
      if (isWixEmbedded) {
        try {
          const cmsChapter = await callWixBackend('getChapterBundle', { chapterId: id });
          if (cmsChapter?.id && Array.isArray(cmsChapter.items) && Array.isArray(cmsChapter.matching?.pairs)) {
            return cmsChapter;
          }
          throw new Error('INVALID_CMS_CHAPTER_BUNDLE');
        } catch (error) {
          console.info('[ATELIER] Using bundled chapter data for', id, error?.message || error);
        }
      }
      const res = await fetch(`data/${id}.json`);
      if (!res.ok) throw new Error(`Could not load ${id}`);
      return res.json();
    }));
    chapters = loaded.filter(ch => ch.status !== 'archived').sort((a,b) => a.order-b.order);
  }

  function setLanguage(next) {
    if (!['th','en'].includes(next)) return;
    lang = next;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    langButton.textContent = lang === 'th' ? 'EN' : 'TH';
    if (screen === 'language') renderLanguage();
    else if (screen === 'home') renderHome();
    else if (screen === 'chapters') renderChapterSelection();
    else if (screen === 'intro') renderChapterIntro();
    else if (screen === 'review') renderToolReview();
    else if (screen === 'activity') renderActivity();
    else if (screen === 'scenario') renderScenario();
    else if (screen === 'keyboard') renderKeyboardChallenge();
    else if (screen === 'scenarioResult') renderScenarioResult();
    else if (screen === 'matching') renderMatching();
    else if (screen === 'result') renderResult();
  }

  function setScreen(name) {
    screen = name;
    document.body.classList.toggle('is-language-screen', name === 'language');
    progressLabel.textContent = previewMode ? t('preview') : t('progress');
    if (name === 'language') renderLanguage();
    if (name === 'home') renderHome();
    if (name === 'chapters') renderChapterSelection();
    if (name === 'intro') renderChapterIntro();
    if (name === 'review') renderToolReview();
    if (name === 'activity') renderActivity();
    if (name === 'scenario') renderScenario();
    if (name === 'keyboard') renderKeyboardChallenge();
    if (name === 'scenarioResult') renderScenarioResult();
    if (name === 'matching') renderMatching();
    if (name === 'result') renderResult();
  }

  function renderLanguage() {
    document.body.classList.add('is-language-screen');
    app.innerHTML = `
      <section class="language-artwork-screen" aria-label="ATELIER language selection">
        <img class="language-artwork" src="assets/atelier-language-selection.jpg" alt="ATELIER fashion studio with Elena and Thai and English language choices">
        <button class="language-hotspot language-hotspot-th" type="button" data-lang="th" aria-label="เลือกภาษาไทย"></button>
        <button class="language-hotspot language-hotspot-en" type="button" data-lang="en" aria-label="Choose English"></button>
      </section>`;
    app.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      setScreen('home');
    }));
  }

  function renderHome() {
    app.innerHTML = `
      <section class="atelier-home">
        <div class="atelier-home-portrait">
          <img class="atelier-room-background" src="assets/atelier-bg.png" alt="" aria-hidden="true">
          <img class="atelier-elena-character" src="assets/elena-portrait.png" alt="Elena, Senior Designer and Atelier mentor">
          <div class="portrait-caption"><span class="eyebrow">YOUR ATELIER MENTOR</span><strong>Elena</strong><small>${lang==='th'?'Senior Designer · ที่ปรึกษาประจำ Atelier':'Senior Designer · Atelier Mentor'}</small></div>
        </div>
        <div class="atelier-home-copy">
          <div class="eyebrow">${t('homeEyebrow')} · ATELIER</div>
          <div class="home-wordmark" aria-hidden="true">ATELIER</div>
          <p class="home-kicker">${lang==='th'?'FASHION DESIGN LEARNING JOURNAL':'FASHION DESIGN LEARNING JOURNAL'}</p>
          <h1>${lang==='th'?'ทุกความคิดสร้างสรรค์ เริ่มต้นจากการเรียนรู้':'Every creative idea begins with learning.'}</h1>
          <p class="lead">${t('homeText')}</p>
          <div class="home-rule"></div>
          <button class="primary-button" id="start-button">${t('start')} <span aria-hidden="true">→</span></button>
          <button class="text-button" id="home-language">${t('changeLanguage')}</button>
          <div class="home-page-index"><span>01</span><i></i><span>THE ATELIER</span></div>
        </div>
      </section>`;
    document.getElementById('start-button').onclick = () => setScreen('chapters');
    document.getElementById('home-language').onclick = () => setScreen('language');
  }

  function chapterProgress(ch) {
    const bank = ch.matching?.pairs || [];
    const ids = bank.map(pair => pair.id);
    if (!ids.length) return { completed:0, total:0, percent:0, remaining:0, done:false };
    const localCompletedIds = (!previewMode && typeof recordAdapter !== 'undefined')
      ? recordAdapter.getChapterProgress(PLAYER_ID, ch.id, ids).completedPairIds
      : (sessionCompletedPairIds[ch.id] || []);
    const remoteCompletedIds = (!previewMode && remoteProgressCache[ch.id]?.completedPairIds)
      ? remoteProgressCache[ch.id].completedPairIds
      : [];
    const completedIds = [...new Set([...localCompletedIds, ...remoteCompletedIds])];
    const completed = ids.filter(id => completedIds.includes(id)).length;
    return { completed, total:ids.length, percent:Math.round(completed/ids.length*100), remaining:ids.length-completed, done:completed===ids.length };
  }

  function renderChapterSelection() {
    app.innerHTML = `
      <section class="content-shell">
        <div class="section-heading"><div class="eyebrow">THE FASHION ATELIER · LEARNING PATH</div><h1>${t('chooseChapter')}</h1><p>${t('chapterHint')}</p></div>
        <div class="chapter-grid">${chapters.map(ch => {
          const p = chapterProgress(ch);
          const status = p.done ? t('chapterCompleted') : p.completed ? t('inProgress') : t('notStarted');
          return `<button class="chapter-card chapter-progress-card" data-chapter="${esc(ch.id)}">
            <span class="chapter-number">${String(ch.order).padStart(2,'0')}</span>
            <span class="chapter-copy"><small>${t('chapter')} ${String(ch.order).padStart(2,'0')}</small><strong>${esc(localized(ch.title))}</strong><span>${esc(localized(ch.summary))}</span>
              <span class="chapter-progress-meta"><b>${status}</b><b>${p.percent}%</b></span>
              <span class="chapter-progress-track"><i style="width:${p.percent}%"></i></span>
              <span class="chapter-progress-count">${p.completed}/${p.total} · ${p.remaining} ${t('remaining')}</span>
            </span>
          </button>`;
        }).join('')}</div>
        <div class="page-actions"><button class="secondary-button" id="home-back">${t('startOver')}</button><button class="text-button" id="chapter-language">${t('changeLanguage')}</button></div>
      </section>`;
    app.querySelectorAll('[data-chapter]').forEach(btn => btn.onclick = () => openChapter(btn.dataset.chapter));
    document.getElementById('home-back').onclick = () => setScreen('home');
    document.getElementById('chapter-language').onclick = () => setScreen('language');
  }
  function openChapter(id) {
    activeChapter = chapters.find(ch => ch.id === id);
    if (!activeChapter) { app.innerHTML = `<section class="content-shell"><h2>${t('missing')}</h2></section>`; return; }
    stats = freshStats(); pairAttempts = {}; matchedIds = new Set(); revealedIds = new Set(); selectedToolId = null; lastFeedback = null; matchingRoundsPlayed = 0;
    lastChoice = null; scenarioIndex = 0; scenarioCorrect = 0; scenarioWrong = 0;
    roundPairs = []; // Select the five-question round only when the learner starts Matching.
    attemptStartedAt = Date.now();
    if (!previewMode && typeof recordAdapter !== 'undefined') {
      attemptId = recordAdapter.startAttempt(PLAYER_ID, activeChapter.id, activeChapter.contentVersion || 1);
      sendRemoteAttemptStart();
    } else attemptId = 'preview_attempt';
    setScreen('intro');
  }

  function renderChapterIntro() {
    const ch = activeChapter;
    app.innerHTML = `
      <section class="content-shell narrow-shell">
        <div class="breadcrumb"><button class="text-button" id="intro-back">← ${t('chapters')}</button><span>/</span><span>${t('chapter')} ${String(ch.order).padStart(2,'0')}</span></div>
        <div class="chapter-hero"><div class="eyebrow">${t('chapter')} ${String(ch.order).padStart(2,'0')}</div><h1>${esc(localized(ch.title))}</h1><p class="lead">${esc(localized(ch.summary))}</p></div>
        <div class="info-card"><h2>${t('learningObjectives')}</h2><ul>${(ch.learningObjectives?.[lang] || []).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="info-card"><p>${esc(localized(ch.intro))}</p><p class="muted">${t('reviewFirst')}</p></div>
        <div class="intro-actions"><button class="primary-button" id="intro-next">${t('beginLesson')} →</button></div>
      </section>`;
    document.getElementById('intro-back').onclick = () => setScreen('chapters');
    document.getElementById('intro-next').onclick = () => setScreen('review');
  }

  function renderToolReview() {
    const ch = activeChapter;
    app.innerHTML = `
      <section class="content-shell">
        <div class="breadcrumb"><button class="text-button" id="review-back">← ${t('back')}</button><span>/</span><span>${esc(localized(ch.title))}</span></div>
        <div class="section-heading"><div class="eyebrow">${t('chapter')} ${String(ch.order).padStart(2,'0')}</div><h1>${t('toolReview')}</h1><p>${esc(localized(ch.summary))}</p></div>
        <div class="tool-review-grid">${ch.items.map((item,i)=>`
          <article class="tool-review-card">
            <div class="tool-card-top"><span class="tool-index">${String(i+1).padStart(2,'0')}</span><span class="shortcut">${item.shortcut ? esc(item.shortcut) : '—'}</span></div>
            <div class="tool-review-heading">${toolIcon(item)}<h3>${esc(localized(item.name))}</h3></div><p>${esc(localized(item.description))}</p>
          </article>`).join('')}</div>
        <div class="page-actions"><button class="secondary-button" id="review-chapters">${t('chapters')}</button><button class="primary-button" id="review-start">${t('matchingIntro')} →</button></div>
      </section>`;
    document.getElementById('review-back').onclick = () => setScreen('intro');
    document.getElementById('review-chapters').onclick = () => setScreen('chapters');
    document.getElementById('review-start').onclick = () => setScreen('activity');
  }


  function toolIcon(item) {
    // Simple monochrome vector pictograms inspired by Illustrator tool functions.
    // They are original learning icons, not official Adobe toolbar assets.
    const paths = {
      tool_selection:'<path d="M10 5l10 27 5-10 10 5z"/>',
      tool_direct_selection:'<path d="M10 5l10 27 5-10 10 5z"/><circle cx="10" cy="5" r="2.5"/><circle cx="20" cy="32" r="2.5"/><circle cx="25" cy="22" r="2.5"/>',
      tool_group_selection:'<rect x="8" y="9" width="22" height="20" rx="2"/><rect x="14" y="14" width="17" height="16" rx="2"/>',
      tool_magic_wand:'<path d="M9 28L27 10l5 5-18 18z"/><path d="M28 5v5M35 12h-5M7 10l4 4M5 20h5"/>',
      tool_lasso:'<path d="M8 20c0-9 7-14 15-12 8 2 12 10 6 17-5 6-17 8-21 1-2-3-1-5 0-6z"/>',
      tool_pen:'<path d="M20 5l10 10-12 17-8-8z"/><path d="M10 24l-3 9 9-3M20 5l-3 8 6 6 7-4"/>',
      tool_anchor_point:'<path d="M8 27L30 9"/><circle cx="8" cy="27" r="3"/><circle cx="30" cy="9" r="3"/><path d="M19 18l-7-7M19 18l7 7"/>',
      tool_curvature:'<path d="M7 29Q20 2 33 29"/><circle cx="7" cy="29" r="2"/><circle cx="33" cy="29" r="2"/>',
      tool_type:'<path d="M8 9h24M20 9v23M14 32h12"/>',
      tool_line_segment:'<path d="M8 31L32 8"/>',
      tool_shape:'<circle cx="20" cy="20" r="12"/>',
      tool_brush:'<path d="M8 28Q15 7 31 11Q35 20 18 25Q12 27 8 28z"/><path d="M8 28q-2 7-7 5"/>',
      tool_pencil:'<path d="M9 29L28 10l5 5-19 19H8z"/><path d="M25 13l5 5"/>',
      tool_rotate_reflect:'<path d="M11 14a12 12 0 1 1-1 12"/><path d="M11 7v8h8"/>',
      tool_scale_shear:'<rect x="9" y="9" width="22" height="22"/><path d="M5 20h30M20 5v30"/>',
      tool_width:'<path d="M8 20h24M8 20l6-6M8 20l6 6M32 20l-6-6M32 20l-6 6"/>',
      tool_free_transform:'<path d="M10 10h20v20H10z"/><path d="M5 15l10-10M25 5h10v10M35 25v10H25M15 35H5V25"/>',
      tool_shape_builder:'<circle cx="15" cy="20" r="10"/><circle cx="25" cy="20" r="10"/><path d="M20 10v20"/>',
      tool_perspective_grid:'<path d="M5 10l30-5v25L5 35zM5 10l30 20M35 5L5 35M20 7v25"/>',
      tool_eraser_scissors:'<path d="M8 12l24 16M8 28l24-16"/><circle cx="10" cy="10" r="4"/><circle cx="10" cy="30" r="4"/>',
      tool_gradient:'<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="currentColor"/><stop offset="1" stop-color="white"/></linearGradient></defs><rect x="8" y="8" width="24" height="24" rx="3" fill="url(#g)"/>',
      tool_mesh:'<rect x="8" y="8" width="24" height="24"/><path d="M16 8v24M24 8v24M8 16h24M8 24h24"/>',
      tool_eyedropper:'<path d="M27 7l6 6-17 17-7 2 2-7zM22 12l6 6"/>',
      tool_blend:'<circle cx="12" cy="20" r="7"/><circle cx="28" cy="20" r="7"/><path d="M17 15l6 10M17 25l6-10"/>',
      tool_symbol_sprayer:'<circle cx="20" cy="20" r="4"/><circle cx="9" cy="10" r="2"/><circle cx="31" cy="10" r="2"/><circle cx="9" cy="30" r="2"/><circle cx="31" cy="30" r="2"/>',
      tool_fill_stroke:'<circle cx="20" cy="20" r="12"/><path d="M20 8v24"/>',
      tool_default_fill_stroke:'<rect x="8" y="8" width="24" height="24"/><path d="M8 32L32 8"/>',
      tool_color_gradient_none:'<circle cx="20" cy="20" r="12"/><path d="M8 20h24"/>',
      tool_draw_modes:'<rect x="8" y="8" width="24" height="24"/><path d="M20 8v24M8 20h24"/>',
      tool_screen_mode:'<rect x="7" y="9" width="26" height="21" rx="2"/><path d="M13 34h14"/>',
      tool_column_graph:'<path d="M8 32V20h6v12M18 32V10h6v22M28 32V16h6v16"/>',
      tool_artboard:'<rect x="7" y="8" width="26" height="24"/><path d="M3 14V4h10M27 4h10v10M37 26v10H27M13 36H3V26"/>',
      tool_slice:'<rect x="7" y="8" width="26" height="24"/><path d="M7 16h26M16 8v24M26 8v24"/>',
      tool_hand:'<path d="M12 20v-8a2 2 0 0 1 4 0v7-11a2 2 0 0 1 4 0v10-8a2 2 0 0 1 4 0v9-5a2 2 0 0 1 4 0v11c0 6-4 9-10 9h-2c-4 0-6-3-8-7l-3-5a2 2 0 0 1 3-2z"/>',
      tool_zoom:'<circle cx="17" cy="17" r="10"/><path d="M25 25l9 9M17 12v10M12 17h10"/>',
      shortcut_copy_paste_cut:'<rect x="8" y="10" width="18" height="22" rx="2"/><path d="M14 6h16v22M17 15h8M17 21h8"/>',
      shortcut_undo_redo:'<path d="M12 13H5l7-7M5 13a15 15 0 1 1 2 15"/>',
      shortcut_group_ungroup:'<rect x="7" y="7" width="12" height="12"/><rect x="21" y="7" width="12" height="12"/><rect x="14" y="21" width="12" height="12"/>',
      shortcut_tool_switch:'<rect x="7" y="8" width="26" height="22" rx="3"/><path d="M12 14h4M22 14h4M12 21h4M22 21h4M17 30v5"/>',
      shortcut_panels:'<rect x="7" y="7" width="26" height="26"/><path d="M7 15h26M16 15v18"/>',
      shortcut_select_all:'<rect x="9" y="9" width="22" height="22" stroke-dasharray="3 3"/><path d="M15 15h10v10H15z"/>',
      shortcut_active_artboard:'<rect x="8" y="8" width="24" height="24"/><path d="M4 14V4h10M26 4h10v10"/>',
      shortcut_create_layer:'<path d="M6 15l14-8 14 8-14 8zM6 22l14 8 14-8"/>'
    };
    const path = paths[item.id] || '<path d="M20 6v28M6 20h28"/><circle cx="20" cy="20" r="12"/>';
    return `<span class="tool-symbol tool-vector" role="img" aria-label="${esc(localized(item.name))}"><svg viewBox="0 0 40 40" aria-hidden="true">${path}</svg></span>`;
  }

  function renderActivity() {
    app.innerHTML = `
      <section class="content-shell narrow-shell">
        <div class="breadcrumb"><button class="text-button" id="activity-back">← ${t('back')}</button><span>/</span><span>${esc(localized(activeChapter.title))}</span></div>
        <div class="section-heading"><div class="eyebrow">${t('chapter')} ${String(activeChapter.order).padStart(2,'0')}</div><h1>${t('chooseActivity')}</h1></div>
        <div class="activity-choice-grid">
          <button class="activity-choice" id="choose-matching"><span class="activity-number">01</span><strong>${t('matchingMode')}</strong><small>${t('roundNotice')}</small><span class="activity-arrow">→</span></button>
          <button class="activity-choice" id="choose-scenario"><span class="activity-number">02</span><strong>${t('scenarioMode')}</strong><small>${t('scenarioInstruction')}</small><span class="activity-arrow">→</span></button>
        </div>
      </section>`;
    document.getElementById('activity-back').onclick=()=>setScreen('review');
    document.getElementById('choose-matching').onclick=()=>beginMatchingRound();
    document.getElementById('choose-scenario').onclick=()=>{
      if (activeChapter.id === 'c06_essential_shortcuts') {
        beginKeyboardRound();
        return;
      }
      scenarioIndex=0;scenarioCorrect=0;scenarioWrong=0;scenarioAttempts={};scenarioOptions={};scenarioResolved={};
      const scenarioBank=buildScenarioPool();scenarioPool=shuffle(scenarioBank).slice(0,Math.min(5,scenarioBank.length));
      setScreen('scenario');
    };
  }

  function buildScenarioPool() {
    const authored = {
      tool_selection: {
        th:'ต้องการย้ายภาพเสื้อทั้งชิ้นไปจัดวางบน Fashion Board โดยไม่เปลี่ยนรูปทรงภายใน ควรใช้เครื่องมือใด?',
        en:'You need to move the entire garment illustration on the fashion board without changing its shape. Which tool should you use?',
        visual:'fashion_move'
      },
      tool_direct_selection:{th:'แนวคอเสื้อมีรูปทรงไม่พอดี ต้องการขยับจุดบนเส้นขอบเพียงจุดเดียวเพื่อปรับทรง ควรใช้เครื่องมือใด?',en:'The neckline shape needs adjustment. You need to move one point on its path. Which tool should you use?',visual:'neckline_anchor'},
      tool_group_selection:{th:'ลายตกแต่งบนกระเป๋าถูกจัดเป็นกลุ่ม แต่ต้องการเลือกเฉพาะชิ้นส่วนดาวหนึ่งดวงเพื่อย้ายตำแหน่ง ควรใช้เครื่องมือใด?',en:'A decorative pattern on a bag is grouped. You need to select and move just one star. Which tool should you use?',visual:'bag_group'},
      tool_magic_wand:{th:'บน Fashion Board มีชิ้นส่วนหลายชิ้นใช้สีชมพูเดียวกัน ต้องการเลือกชิ้นส่วนที่มีสี Fill เดียวกันพร้อมกัน ควรใช้เครื่องมือใด?',en:'Several elements on the fashion board share the same pink fill. You need to select them together. Which tool should you use?',visual:'same_color_fabric'},
      tool_lasso:{th:'ต้องการเลือกจุดบนเส้นโครงกระโปรงเฉพาะบริเวณชายผ้า โดยลากเส้นล้อมแบบอิสระ ควรใช้เครื่องมือใด?',en:'You need to freely circle several anchor points along the skirt hem to select them. Which tool should you use?',visual:'skirt_anchor_lasso'},
      tool_pen:{th:'กำลังวาดเส้นโครงชุดเดรส แต่เส้น Path ยังขาดอยู่ ต้องการต่อเส้นจากจุดปลายเดิม ควรใช้เครื่องมือใด?',en:'You are drawing a dress outline. The path is unfinished, and you need to continue from its endpoint. Which tool should you use?',visual:'unfinished_dress_path'},
      tool_anchor_point:{th:'เส้นขอบกระเป๋ามีจุดควบคุมไม่พอดีกับรูปทรง ต้องการเพิ่มหรือลบจุด Anchor บนเส้นเดิม ควรใช้เครื่องมือใด?',en:'The bag outline has too many or too few control points. Which tool lets you add or remove anchor points on the existing path?',visual:'bag_anchor_edit'},
      tool_curvature:{th:'เส้นชายกระโปรงเป็นมุมแข็ง ต้องการปรับให้เป็นเส้นโค้งนุ่มนวลโดยกำหนดจุดตามแนวเส้น ควรใช้เครื่องมือใด?',en:'The skirt hem has sharp corners. You want to reshape it into a smooth curve by placing points along the path. Which tool should you use?',visual:'skirt_curve'},
      tool_type:{th:'ต้องการเพิ่มชื่อคอลเลกชันและข้อความรายละเอียดลงบน Fashion Board ให้แก้ไขข้อความได้ ควรใช้เครื่องมือใด?',en:'You need to add an editable collection title and details to the fashion board. Which tool should you use?',visual:'collection_typography'},
      tool_line_segment:{th:'ต้องการวาดเส้นตรงเป็นแนวตะเข็บบนแบบเสื้อ โดยให้เส้นเชื่อมระหว่างสองจุด ควรใช้เครื่องมือใด?',en:'You need to draw a straight seam guideline between two points on a garment design. Which tool should you use?',visual:'garment_seam'},
      tool_shape:{th:'กำลังออกแบบลายผ้าและต้องการเพิ่มวงกลมกับรูปทรงเรขาคณิตลงใน Pattern Board ควรใช้เครื่องมือใด?',en:'You are creating a fabric pattern and need to add circles and geometric shapes to the pattern board. Which tool should you use?',visual:'fabric_geometric_pattern'},
      tool_brush:{th:'ต้องการวาดเส้นตกแต่งบนภาพประกอบแฟชั่นให้มีลักษณะคล้ายรอยพู่กันและน้ำหนักเส้น ควรใช้เครื่องมือใด?',en:'You need to paint a decorative, brush-like stroke with a varied appearance on a fashion illustration. Which tool should you use?',visual:'fashion_brush_stroke'},
      tool_pencil:{th:'ต้องการร่างเส้นอิสระตามแนวผ้าที่พลิ้วไหว โดยลากเมาส์เป็นเส้นต่อเนื่อง ควรใช้เครื่องมือใด?',en:'You need to sketch a freeform flowing fabric line by dragging the mouse. Which tool should you use?',visual:'flowing_fabric_sketch'},
      tool_rotate_reflect:{th:'ต้องการหมุนและสะท้อนวัตถุเพื่อสร้างชิ้นงานที่สมมาตร ควรใช้เครื่องมือใด?',en:'You need to rotate and reflect an object to create a symmetrical design. Which tool should you use?',visual:'symmetric_bodice'},
      tool_scale_shear:{th:'ต้องการปรับขนาดหรือเอียงวัตถุโดยคงการแก้ไขรูปทรงเดิม ควรใช้เครื่องมือใด?',en:'You need to scale or shear an object. Which tool should you use?',visual:'motif_scale_shear'},
      tool_width:{th:'ต้องการปรับความหนาของเส้น Stroke ให้หนาบางต่างกันตามตำแหน่ง ควรใช้เครื่องมือใด?',en:'You need to vary the width of a stroke along its length. Which tool should you use?',visual:'variable_seam'},
      tool_free_transform:{th:'ต้องการปรับขนาด หมุน และบิดวัตถุด้วยกรอบ Transform ควรใช้เครื่องมือใด?',en:'You need to resize, rotate, and distort an object using its transform handles. Which tool should you use?',visual:'fashion_transform'},
      tool_shape_builder:{th:'มีวงกลมสองวงซ้อนทับกัน และต้องการรวมพื้นที่บางส่วนให้เป็นรูปทรงใหม่ ควรใช้เครื่องมือใด?',en:'Two circles overlap, and you want to combine selected regions into a new shape. Which tool should you use?',visual:'overlap_pattern'},
      tool_perspective_grid:{th:'ต้องการวาดองค์ประกอบเสื้อผ้าให้สอดคล้องกับแนว Perspective ควรใช้เครื่องมือใด?',en:'You need to draw design elements aligned to a perspective plane. Which tool should you use?',visual:'atelier_perspective'},
      tool_eraser_scissors:{th:'ต้องการลบหรือตัดเส้น Path บางส่วนออกจากงาน ควรใช้เครื่องมือใด?',en:'You need to erase or cut part of a path. Which tool should you use?',visual:'cut_fabric_path'},
      tool_gradient:{th:'สีบนผืนผ้าต้องเปลี่ยนจากสีชมพูอ่อนไปเป็นสีเข้มอย่างต่อเนื่อง ต้องการเติมสีไล่ระดับในรูปทรง ควรใช้เครื่องมือใด?',en:'The fabric color should transition smoothly from light pink to a darker shade. Which tool should you use?',visual:'fabric_gradient'},
      tool_mesh:{th:'ต้องการสร้างแสงเงาบนผืนผ้า โดยควบคุมสีหลายตำแหน่งให้เกิดมิติอย่างละเอียด ควรใช้เครื่องมือใด?',en:'You need detailed highlights and shadows on fabric by controlling color at multiple points. Which tool should you use?',visual:'fabric_mesh_shading'},
      tool_eyedropper:{th:'มีสีตัวอย่างจาก Mood Board และต้องการนำสีเดียวกันไปใช้กับชิ้นส่วนเสื้ออีกชิ้น ควรใช้เครื่องมือใด?',en:'You have a reference color on the mood board and want to apply that exact color to another garment element. Which tool should you use?',visual:'moodboard_color_sample'},
      tool_blend:{th:'ต้องการสร้างวงกลมหลายขนาดค่อย ๆ เปลี่ยนผ่านระหว่างองค์ประกอบสองชิ้นเพื่อทำลายกราฟิก ควรใช้เครื่องมือใด?',en:'You want to create intermediate circles that transition between two graphic elements. Which tool should you use?',visual:'motif_blend'},
      tool_symbol_sprayer:{th:'ต้องการกระจายลวดลาย Symbol ซ้ำ ๆ ลงบนพื้นที่ผ้าเพื่อสร้าง Pattern อย่างรวดเร็ว ควรใช้เครื่องมือใด?',en:'You need to spray repeated symbol motifs across a fabric area to build a pattern. Which tool should you use?',visual:'fabric_symbol_pattern'},
      tool_fill_stroke:{th:'ต้องการสลับการกำหนดสี Fill และ Stroke ของวัตถุ ควรใช้คำสั่งหรือเครื่องมือใด?',en:'You need to switch the active Fill and Stroke targets. Which control should you use?',visual:'fill_stroke_garment'},
      tool_default_fill_stroke:{th:'ต้องการคืนค่า Fill และ Stroke ให้เป็นค่าเริ่มต้น ควรใช้คำสั่งใด?',en:'You need to restore the default Fill and Stroke appearance. Which command should you use?',visual:'default_appearance'},
      tool_color_gradient_none:{th:'ต้องการกำหนดวัตถุให้ไม่มีสี Fill หรือ Stroke ควรเลือกตัวเลือกใด?',en:'You need to remove the Fill or Stroke from an object. Which option should you choose?',visual:'fill_options'},
      tool_draw_modes:{th:'ต้องการเปลี่ยนโหมดการวาดเพื่อวาดด้านในหรือด้านหลังวัตถุ ควรใช้คำสั่งใด?',en:'You need to change the drawing mode to draw inside or behind an object. Which command should you use?',visual:'draw_inside_motif'},
      tool_screen_mode:{th:'ต้องการเปลี่ยนรูปแบบการแสดงหน้าจอเพื่อเพิ่มพื้นที่ทำงาน ควรใช้คำสั่งใด?',en:'You need to change the screen mode to gain more workspace. Which command should you use?',visual:'workspace_screen'},
      tool_column_graph:{th:'ต้องการนำยอดขายเสื้อผ้า 4 ประเภทมาเปรียบเทียบด้วยกราฟแท่งบนหน้า Presentation ควรใช้เครื่องมือใด?',en:'You need to compare sales across four clothing categories using a column chart. Which tool should you use?',visual:'fashion_sales_chart'},
      tool_artboard:{th:'กำลังจัดทำ Fashion Presentation หลายหน้า และต้องการเพิ่มพื้นที่ Artboard สำหรับหน้าใหม่ ควรใช้เครื่องมือใด?',en:'You are preparing a multi-page fashion presentation and need to add a new artboard. Which tool should you use?',visual:'fashion_presentation_artboards'},
      tool_slice:{th:'ต้องการแบ่งหน้า Fashion Board เป็นส่วน ๆ เพื่อส่งออกภาพแต่ละส่วนแยกกัน ควรใช้เครื่องมือใด?',en:'You need to divide the fashion board into separate export regions. Which tool should you use?',visual:'fashion_export_slices'},
      tool_hand:{th:'ต้องการเลื่อนมุมมองไปยังอีกบริเวณของ Artboard โดยไม่ย้ายวัตถุ ควรใช้เครื่องมือใด?',en:'You need to pan the view to another area without moving artwork. Which tool should you use?',visual:'canvas_pan_fashion'},
      tool_zoom:{th:'ต้องการขยายมุมมองเพื่อดูรายละเอียดของงานให้ชัดขึ้น ควรใช้เครื่องมือใด?',en:'You need to zoom in to inspect details of your artwork. Which tool should you use?',visual:'fabric_detail_zoom'},
      shortcut_copy_paste_cut:{th:'ต้องการทำสำเนาวัตถุแล้วนำไปวางในตำแหน่งอื่น ควรใช้คำสั่งใด?',en:'You need to duplicate an object and place the copy elsewhere. Which commands should you use?',visual:'pattern_duplicate'},
      shortcut_undo_redo:{th:'ต้องการย้อนกลับการแก้ไขล่าสุดแล้วทำซ้ำอีกครั้ง ควรใช้คำสั่งใด?',en:'You need to undo the last edit and then redo it. Which commands should you use?',visual:'fashion_edit_history'},
      shortcut_group_ungroup:{th:'ต้องการรวมวัตถุหลายชิ้นให้เคลื่อนย้ายพร้อมกัน แล้วแยกออกภายหลัง ควรใช้คำสั่งใด?',en:'You need to group several objects so they move together, then ungroup them later. Which commands should you use?',visual:'grouped_motifs'},
      shortcut_tool_switch:{th:'ต้องการเรียกใช้ Selection, Direct Selection หรือ Pen Tool ด้วยแป้นพิมพ์ ควรใช้คำสั่งใด?',en:'You need to switch quickly between Selection, Direct Selection, and Pen tools using the keyboard. Which command should you use?',visual:'tool_switch_workspace'},
      shortcut_panels:{th:'ต้องการซ่อนแผงควบคุมทั้งหมดชั่วคราวเพื่อเพิ่มพื้นที่ทำงาน ควรใช้คำสั่งใด?',en:'You need to temporarily hide all panels to gain workspace. Which command should you use?',visual:'workspace_panels'},
      shortcut_select_all:{th:'ต้องการเลือกวัตถุทั้งหมดในเอกสารปัจจุบัน ควรใช้คำสั่งใด?',en:'You need to select all objects in the current document. Which command should you use?',visual:'select_all_fashion_art'},
      shortcut_active_artboard:{th:'ต้องการเลือกวัตถุทั้งหมดที่อยู่บน Artboard ปัจจุบัน ควรใช้คำสั่งใด?',en:'You need to select all objects on the active artboard. Which command should you use?',visual:'active_board_objects'},
      shortcut_create_layer:{th:'ต้องการสร้าง Layer ใหม่เพื่อแยกองค์ประกอบของงาน ควรใช้คำสั่งใด?',en:'You need to create a new layer to separate artwork elements. Which command should you use?',visual:'fashion_layers'}
    };
    return activeChapter.items.map(item => {
      const a=authored[item.id];
      const fallback={th:`${localized(item.matchingPrompt)||localized(item.description)} ควรใช้เครื่องมือหรือคำสั่งใด?`,en:`${localized(item.matchingPrompt)||localized(item.description)} Which tool or command should you use?`,visual:'default'};
      return {itemId:item.id,prompt:a?{th:a.th,en:a.en}:fallback,visual:a?.visual||'default'};
    });
  }

  function scenarioArtwork(kind) {
    // Illustrator-inspired workspace simulation: control bar, left toolbar,
    // white artboard and a task-specific vector scene. This is an original
    // teaching illustration, not a screenshot or official Adobe asset.
    const drawings = {
      fashion_move:'<path d="M48 24L62 12L78 24L98 36L86 54L78 48L82 112H38L42 48L34 54L22 36Z" fill="#e8c9c1" stroke="#713c48" stroke-width="2"/><path d="M48 24L62 42L78 24M62 42V112" stroke="#713c48"/><rect x="30" y="18" width="64" height="100" fill="none" stroke="#344d86" stroke-dasharray="4 3"/><path d="M62 8v12m-5-5 5 5 5-5M18 68h12m-5-5 5 5-5 5M94 68h12m-5-5 5 5-5 5"/>',
      neckline_anchor:'<path d="M30 28L45 18L62 42L79 18L94 28L108 112H16Z" fill="#eadbd4" stroke="#713c48" stroke-width="2"/><path d="M45 18Q62 62 79 18" fill="none" stroke="#344d86" stroke-width="2.5"/><circle cx="62" cy="42" r="5" fill="#c98282" stroke="#344d86"/><path d="M62 42L48 28M62 42L76 28" stroke="#344d86" stroke-dasharray="3 2"/>',
      bag_group:'<path d="M35 48h70l-8 64H43Z" fill="#d7b9ad" stroke="#713c48" stroke-width="2"/><path d="M48 48Q48 18 70 18Q92 18 92 48" fill="none" stroke="#713c48" stroke-width="4"/><g fill="#718575" stroke="#344d86"><path d="M53 68l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z"/><path d="M83 82l3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/></g><rect x="75" y="65" width="24" height="28" fill="none" stroke="#344d86" stroke-dasharray="3 2"/>',
      same_color_fabric:'<path d="M20 25h38v34H20zM72 25h38v34H72zM20 78h38v34H20zM72 78h38v34H72z" fill="#c98282" stroke="#713c48" stroke-width="2"/><path d="M14 18h50v48H14zM66 71h50v48H66z" fill="none" stroke="#344d86" stroke-dasharray="4 3"/>',
      skirt_anchor_lasso:'<path d="M48 20h44l-6 22 24 70H26l24-70z" fill="#e8c9c1" stroke="#713c48" stroke-width="2"/><path d="M50 42L26 112M92 42l18 70M26 112h84" fill="none" stroke="#344d86" stroke-dasharray="3 2"/><g fill="#c98282" stroke="#344d86"><circle cx="35" cy="88" r="4"/><circle cx="47" cy="93" r="4"/><circle cx="60" cy="97" r="4"/><circle cx="74" cy="99" r="4"/><circle cx="88" cy="96" r="4"/></g><path d="M28 78Q58 55 96 77Q119 95 92 111Q50 128 25 103Q13 91 28 78Z" fill="none" stroke="#718575" stroke-width="2" stroke-dasharray="4 3"/>',
      unfinished_dress_path:'<path d="M45 20L62 10L79 20L98 34L86 52L78 45L82 108H42L46 45L38 52L26 34Z" fill="#f1e5df" stroke="#713c48" stroke-width="2"/><path d="M45 20L62 39L79 20L98 34" fill="none" stroke="#344d86" stroke-width="2.5"/><path d="M98 34L108 48" fill="none" stroke="#344d86" stroke-width="2.5" stroke-dasharray="4 4"/><circle cx="98" cy="34" r="4" fill="#c98282" stroke="#344d86"/><path d="M108 48l-6-3m6 3-1-7" stroke="#718575" stroke-width="2"/>',
      bag_anchor_edit:'<path d="M28 48h84l-10 64H38Z" fill="#e8c9c1" stroke="#713c48" stroke-width="2"/><path d="M45 48Q45 18 70 18Q95 18 95 48" fill="none" stroke="#344d86" stroke-width="2"/><g fill="#c98282" stroke="#344d86"><circle cx="38" cy="48" r="4"/><circle cx="70" cy="18" r="4"/><circle cx="102" cy="48" r="4"/><circle cx="28" cy="48" r="4"/><circle cx="112" cy="48" r="4"/></g><path d="M70 18v-12m-5 6 5-6 5 6" stroke="#344d86"/>',
      skirt_curve:'<path d="M48 18h44l-6 25 25 69H23l25-69z" fill="#eadbd4" stroke="#713c48" stroke-width="2"/><path d="M23 112Q68 86 111 112" fill="none" stroke="#344d86" stroke-width="3"/><circle cx="23" cy="112" r="4" fill="#c98282"/><circle cx="68" cy="96" r="4" fill="#c98282"/><circle cx="111" cy="112" r="4" fill="#c98282"/>',
      collection_typography:'<rect x="18" y="18" width="104" height="100" fill="#f5eee8" stroke="#cdb8ad"/><path d="M30 40h80M30 102h60" stroke="#c98282" stroke-width="2"/><text x="70" y="70" font-size="17" text-anchor="middle" fill="#713c48" stroke="none" font-family="Georgia">ATELIER</text><text x="70" y="88" font-size="8" text-anchor="middle" fill="#718575" stroke="none" letter-spacing="2">SPRING / SUMMER</text>',
      garment_seam:'<path d="M35 20L62 12L89 20L112 48L95 60L84 45L88 112H36L40 45L29 60L12 48Z" fill="#eadbd4" stroke="#713c48" stroke-width="2"/><path d="M40 45L36 112M84 45L88 112" stroke="#344d86" stroke-width="2" stroke-dasharray="4 3"/><path d="M36 112h52" stroke="#c98282" stroke-width="2"/>',
      fabric_geometric_pattern:'<rect x="16" y="16" width="108" height="100" fill="#f5eee8" stroke="#cdb8ad"/><g fill="#c98282" stroke="#713c48" stroke-width="1.5"><circle cx="42" cy="42" r="13"/><path d="M84 27l15 26H69z"/><rect x="29" y="77" width="25" height="25"/><path d="M88 76l14 13-14 13-14-13z"/></g>',
      fashion_brush_stroke:'<path d="M15 90Q32 18 57 58T111 30" fill="none" stroke="#c98282" stroke-width="9" stroke-linecap="round"/><path d="M15 90Q32 18 57 58T111 30" fill="none" stroke="#713c48" stroke-width="1.5"/><path d="M24 100q25-12 35-2" stroke="#718575" stroke-width="3" fill="none"/>',
      flowing_fabric_sketch:'<path d="M18 88Q38 20 65 54T116 32" fill="none" stroke="#713c48" stroke-width="2.5"/><path d="M18 99Q42 37 69 68T116 46" fill="none" stroke="#c98282" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M24 75q20-20 35-9m20 18q17 10 31-2" stroke="#718575" fill="none"/>',
      symmetric_bodice:'<path d="M70 12v104" stroke="#718575" stroke-dasharray="4 3"/><path d="M70 22L50 30L34 50L44 64L50 55L52 110H70Z" fill="#e8c9c1" stroke="#713c48" stroke-width="2"/><path d="M70 22L90 30L106 50L96 64L90 55L88 110H70Z" fill="#e8c9c1" stroke="#713c48" stroke-width="2"/>',
      motif_scale_shear:'<path d="M25 40l30-15 20 28-30 15z" fill="#c98282" stroke="#713c48" stroke-width="2"/><path d="M76 50l38-18 12 48-38 18z" fill="#718575" stroke="#344d86" stroke-width="2"/><path d="M20 20h100v90H20z" fill="none" stroke="#344d86" stroke-dasharray="4 3"/>',
      variable_seam:'<path d="M15 85Q45 10 120 75" fill="none" stroke="#713c48" stroke-width="2"/><path d="M15 85Q45 10 120 75" fill="none" stroke="#c98282" stroke-width="10" stroke-dasharray="1 1"/><circle cx="65" cy="42" r="5" fill="#344d86"/>',
      fashion_transform:'<path d="M42 30h56v70H42z" fill="#e8c9c1" stroke="#713c48" stroke-width="2"/><path d="M30 18h80v94H30z" fill="none" stroke="#344d86" stroke-dasharray="4 3"/><g fill="#344d86"><rect x="26" y="14" width="8" height="8"/><rect x="106" y="14" width="8" height="8"/><rect x="26" y="108" width="8" height="8"/><rect x="106" y="108" width="8" height="8"/></g>',
      overlap_pattern:'<circle cx="48" cy="65" r="31" fill="#c98282" fill-opacity=".7" stroke="#713c48" stroke-width="2"/><circle cx="88" cy="65" r="31" fill="#718575" fill-opacity=".7" stroke="#344d86" stroke-width="2"/><path d="M68 38Q88 65 68 92" fill="none" stroke="#713c48" stroke-width="3"/>',
      atelier_perspective:'<path d="M20 35L70 50L120 35M20 35L70 112L120 35M20 35v77h100V35M70 50v62" fill="none" stroke="#344d86" stroke-width="2"/><path d="M42 62h56v34H42z" fill="#e8c9c1" stroke="#713c48"/>',
      cut_fabric_path:'<path d="M22 25L110 105" stroke="#713c48" stroke-width="3"/><path d="M22 105L110 25" stroke="#c98282" stroke-width="3" stroke-dasharray="4 3"/><circle cx="22" cy="25" r="7" fill="#718575"/><circle cx="110" cy="105" r="7" fill="#718575"/><path d="M65 62l12 12m-12 0 12-12" stroke="#344d86" stroke-width="2"/>',
      fabric_gradient:'<path d="M25 24L42 15H98L115 24L104 112H36Z" fill="url(#scene-gradient)" stroke="#713c48" stroke-width="2"/><defs><linearGradient id="scene-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1d9d2"/><stop offset="1" stop-color="#713c48"/></linearGradient></defs>',
      fabric_mesh_shading:'<path d="M25 24L42 15H98L115 24L104 112H36Z" fill="#eadbd4" stroke="#713c48" stroke-width="2"/><path d="M42 15L55 112M70 16V112M98 15L84 112M31 55h78M34 83h75" stroke="#344d86" stroke-width="1.5"/><g fill="#c98282" stroke="#344d86"><circle cx="55" cy="55" r="4"/><circle cx="84" cy="83" r="4"/><circle cx="70" cy="35" r="4"/></g>',
      moodboard_color_sample:'<rect x="18" y="28" width="35" height="65" fill="#c98282"/><rect x="63" y="28" width="35" height="65" fill="#718575"/><path d="M48 20l20-12 12 12-28 28z" fill="#d7b9ad" stroke="#713c48" stroke-width="2"/><path d="M80 88h34v22H80z" fill="#c98282" stroke="#713c48"/>',
      motif_blend:'<circle cx="25" cy="65" r="9" fill="#c98282"/><circle cx="115" cy="65" r="25" fill="#718575"/><circle cx="48" cy="65" r="13" fill="#d3a19b"/><circle cx="72" cy="65" r="17" fill="#b6a29a"/><circle cx="94" cy="65" r="21" fill="#8c947e"/>',
      fabric_symbol_pattern:'<rect x="15" y="15" width="110" height="100" fill="#f5eee8" stroke="#cdb8ad"/><g fill="#c98282" stroke="#713c48"><path d="M35 32l5 10 11 1-8 7 2 11-10-6-10 6 2-11-8-7 11-1z"/><path d="M83 30l5 10 11 1-8 7 2 11-10-6-10 6 2-11-8-7 11-1z"/><path d="M59 78l5 10 11 1-8 7 2 11-10-6-10 6 2-11-8-7 11-1z"/></g>',
      fill_stroke_garment:'<path d="M48 22L62 12L76 22L98 38L86 55L78 48L82 110H42L46 48L38 55L26 38Z" fill="#c98282" stroke="#713c48" stroke-width="3"/><path d="M48 22L62 12L76 22" fill="none" stroke="#344d86" stroke-width="4"/>',
      default_appearance:'<path d="M48 22L62 12L76 22L98 38L86 55L78 48L82 110H42L46 48L38 55L26 38Z" fill="#fff" stroke="#713c48" stroke-width="2"/><path d="M18 18l104 100M122 18L18 118" stroke="#c98282" stroke-width="1.5" stroke-dasharray="4 3"/>',
      fill_options:'<g><rect x="18" y="25" width="30" height="30" fill="#c98282" stroke="#713c48"/><rect x="55" y="25" width="30" height="30" fill="url(#scene-gradient)" stroke="#713c48"/><rect x="92" y="25" width="30" height="30" fill="#fff" stroke="#713c48"/><defs><linearGradient id="scene-gradient"><stop stop-color="#c98282"/><stop offset="1" stop-color="#718575"/></linearGradient></defs></g><path d="M18 85h104" stroke="#713c48" stroke-width="2"/>',
      draw_inside_motif:'<path d="M30 25h80v80H30z" fill="#f0e2dc" stroke="#713c48" stroke-width="2"/><path d="M70 36l9 20 22 2-17 14 5 22-19-12-19 12 5-22-17-14 22-2z" fill="#c98282" stroke="#718575" stroke-width="2"/>',
      workspace_screen:'<rect x="12" y="18" width="116" height="86" rx="4" fill="#3a3a3a"/><rect x="22" y="30" width="96" height="62" fill="#fff"/><path d="M40 76l18-30 18 30z" fill="#c98282" stroke="#713c48"/>',
      fashion_sales_chart:'<path d="M20 108V20M20 108h105" stroke="#713c48" stroke-width="2"/><rect x="32" y="70" width="15" height="38" fill="#c98282"/><rect x="55" y="48" width="15" height="60" fill="#718575"/><rect x="78" y="30" width="15" height="78" fill="#c98282"/><rect x="101" y="57" width="15" height="51" fill="#718575"/>',
      fashion_presentation_artboards:'<rect x="12" y="25" width="45" height="78" fill="#f5eee8" stroke="#713c48" stroke-width="2"/><rect x="68" y="25" width="45" height="78" fill="#f5eee8" stroke="#713c48" stroke-width="2"/><path d="M23 45h23M79 45h23M23 55h23M79 55h23" stroke="#c98282" stroke-width="3"/>',
      fashion_export_slices:'<rect x="12" y="18" width="116" height="94" fill="#f5eee8" stroke="#713c48" stroke-width="2"/><path d="M50 18v94M89 18v94M12 65h116" stroke="#344d86" stroke-width="1.5" stroke-dasharray="4 3"/><rect x="12" y="18" width="38" height="47" fill="#c98282" fill-opacity=".35"/>',
      canvas_pan_fashion:'<rect x="18" y="18" width="108" height="95" fill="#f5eee8" stroke="#cdb8ad"/><path d="M44 38L62 28L80 38L96 52L84 64L78 58L82 98H42L46 58L40 64L28 52Z" fill="#e8c9c1" stroke="#713c48"/><path d="M15 65h-8m0 0 5-5m-5 5 5 5M128 65h8m0 0-5-5m5 5-5 5" stroke="#718575" stroke-width="2"/>',
      fabric_detail_zoom:'<circle cx="70" cy="65" r="42" fill="#f5eee8" stroke="#713c48" stroke-width="2"/><path d="M40 65h60M70 35v60M42 42l56 46M98 42L42 88" stroke="#c98282" stroke-width="2"/><path d="M100 96l24 22" stroke="#713c48" stroke-width="5"/>',
      pattern_duplicate:'<path d="M20 35l12-12 12 12-12 12zM20 78l12-12 12 12-12 12z" fill="#c98282" stroke="#713c48"/><path d="M74 35l12-12 12 12-12 12zM74 78l12-12 12 12-12 12z" fill="#718575" stroke="#713c48"/><path d="M45 55h22m-7-7 7 7-7 7" stroke="#344d86" stroke-width="2"/>',
      fashion_edit_history:'<path d="M34 38H18l16-16M18 38q0 62 54 62 38 0 38-32" fill="none" stroke="#713c48" stroke-width="4"/><path d="M80 26h32v28H80z" fill="#e8c9c1" stroke="#344d86"/><path d="M86 34h20M86 42h14" stroke="#713c48"/>',
      grouped_motifs:'<g fill="#c98282" stroke="#713c48"><circle cx="42" cy="45" r="12"/><circle cx="70" cy="45" r="12"/><circle cx="98" cy="45" r="12"/><path d="M42 75l8 15H34zM70 75l8 15H62zM98 75l8 15H90z"/></g><rect x="24" y="25" width="92" height="75" fill="none" stroke="#344d86" stroke-dasharray="4 3"/>',
      tool_switch_workspace:'<rect x="20" y="20" width="100" height="90" fill="#f5eee8" stroke="#cdb8ad"/><path d="M42 42L58 28L72 42M58 28v36M82 78l18-18m-18 0 18 18" stroke="#713c48" stroke-width="3" fill="none"/><text x="70" y="102" text-anchor="middle" font-size="10" fill="#344d86" stroke="none">V · A · P</text>',
      workspace_panels:'<rect x="15" y="18" width="100" height="94" fill="#f5eee8" stroke="#713c48"/><rect x="88" y="18" width="27" height="94" fill="#718575" fill-opacity=".35"/><path d="M15 38h100M88 18v94" stroke="#344d86"/><path d="M98 30h10M98 40h10M98 50h10" stroke="#713c48"/>',
      select_all_fashion_art:'<rect x="15" y="18" width="110" height="94" fill="#f5eee8" stroke="#cdb8ad"/><path d="M40 36L50 28L60 36L72 48L64 57L60 53L62 90H38L40 53L36 57L28 48Z" fill="#c98282" stroke="#713c48"/><circle cx="94" cy="42" r="12" fill="#718575"/><rect x="78" y="72" width="30" height="20" fill="#d7b9ad"/><rect x="10" y="13" width="120" height="104" fill="none" stroke="#344d86" stroke-dasharray="4 3"/>',
      active_board_objects:'<rect x="8" y="18" width="52" height="90" fill="#eee" stroke="#999"/><rect x="70" y="18" width="58" height="90" fill="#f5eee8" stroke="#344d86" stroke-width="2"/><circle cx="85" cy="42" r="9" fill="#c98282"/><rect x="98" y="62" width="20" height="24" fill="#718575"/><rect x="75" y="13" width="68" height="100" fill="none" stroke="#344d86" stroke-dasharray="4 3"/>',
      fashion_layers:'<rect x="15" y="18" width="110" height="94" fill="#f5eee8" stroke="#cdb8ad"/><path d="M25 42h90M25 65h90M25 88h90" stroke="#718575" stroke-width="7"/><path d="M25 42h12m-12 23h12m-12 23h12" stroke="#713c48" stroke-width="2"/><circle cx="108" cy="42" r="4" fill="#c98282"/><circle cx="108" cy="65" r="4" fill="#c98282"/>',

      move:'<rect x="30" y="38" width="74" height="54" rx="4"/><path d="M67 20v20m-7-7 7 7 7-7M67 92v20m-7-7 7 7 7-7M20 65h20m-7-7 7 7-7 7M104 65h20m-7-7 7 7-7 7"/>',
      anchors:'<path d="M25 90L65 25 110 85"/><circle cx="25" cy="90" r="5"/><circle cx="65" cy="25" r="5"/><circle cx="110" cy="85" r="5"/><path d="M65 25L48 50M65 25L82 50"/>',
      group:'<rect x="25" y="28" width="52" height="52" rx="4" stroke-dasharray="5 4"/><rect x="55" y="50" width="52" height="52"/><circle cx="80" cy="75" r="8"/>',
      colorselect:'<circle cx="36" cy="65" r="18" fill="#c98282"/><circle cx="83" cy="65" r="18" fill="#718575"/><path d="M83 32h18"/>',
      lasso:'<path d="M20 65c0-35 33-48 67-34 28 12 29 46 2 59-30 15-69 7-69-25z"/><circle cx="45" cy="55" r="4"/><circle cx="70" cy="44" r="4"/><circle cx="91" cy="72" r="4"/>',
      pen:'<path d="M25 90L65 25 110 85"/><circle cx="25" cy="90" r="5"/><circle cx="65" cy="25" r="5"/><circle cx="110" cy="85" r="5"/><path d="M65 25v-14m-7 7 7-7 7 7"/>',
      curve:'<path d="M20 90Q65 0 115 90"/><circle cx="20" cy="90" r="4"/><circle cx="115" cy="90" r="4"/>',
      type:'<path d="M25 30h85M67 30v72M45 102h44"/><text x="67" y="78" text-anchor="middle" font-size="38" fill="#713c48" stroke="none">T</text>',
      line:'<path d="M25 100L110 25"/><circle cx="25" cy="100" r="4"/><circle cx="110" cy="25" r="4"/>',
      circles:'<circle cx="48" cy="65" r="28"/><circle cx="100" cy="65" r="28" stroke-dasharray="5 4"/>',
      brush:'<path d="M20 90Q35 20 65 62T115 35" stroke-width="8" stroke-linecap="round"/>',
      pencil:'<path d="M20 95Q40 20 65 65T115 30" stroke-dasharray="4 3"/><path d="M100 25l15 5-8 13z"/>',
      reflect:'<path d="M70 20v90" stroke-dasharray="4 4"/><path d="M30 40l25 0 0 40-25-10zM110 40l-25 0 0 40 25-10z"/>',
      transform:'<rect x="35" y="30" width="70" height="70"/><path d="M25 20h20m-20 0v20M115 20H95m20 0v20M25 110h20m-20 0V90M115 110H95m20 0V90"/>',
      width:'<path d="M20 65Q65 5 115 65" stroke-width="10"/><path d="M20 65Q65 5 115 65" stroke-width="1"/>',
      overlap:'<circle cx="50" cy="65" r="32"/><circle cx="90" cy="65" r="32"/><path d="M70 38Q90 65 70 92" stroke-width="5"/>',
      perspective:'<path d="M15 35L65 48 120 35M15 35L65 105 120 35M15 35v70h105V35M65 48v57"/>',
      cut:'<path d="M20 35L110 95M20 95L110 35" stroke-width="3"/><circle cx="25" cy="30" r="8"/><circle cx="25" cy="100" r="8"/>',
      gradient:'<defs><linearGradient id="scene-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#713c48"/><stop offset="1" stop-color="#e5c8b8"/></linearGradient></defs><path d="M30 95L45 25H105L120 95Z" fill="url(#scene-gradient)" stroke="#713c48"/>',
      mesh:'<path d="M25 30h90v70H25zM55 30v70M85 30v70M25 53h90M25 77h90"/><circle cx="55" cy="53" r="4" fill="#c98282"/><circle cx="85" cy="77" r="4" fill="#718575"/>',
      eyedropper:'<rect x="18" y="35" width="42" height="55" rx="3" fill="#c98282"/><rect x="80" y="35" width="42" height="55" rx="3" fill="#718575"/><path d="M52 28L83 10l12 12-31 31zM57 47l12 12"/>',
      blend:'<circle cx="30" cy="65" r="16" fill="#c98282"/><circle cx="110" cy="65" r="16" fill="#718575"/><circle cx="57" cy="65" r="7" fill="#d6a19a"/><circle cx="83" cy="65" r="11" fill="#9b8b82"/>',
      symbols:'<circle cx="35" cy="40" r="8"/><circle cx="75" cy="35" r="8"/><circle cx="110" cy="55" r="8"/><circle cx="48" cy="90" r="8"/><circle cx="90" cy="95" r="8"/>',
      fillstroke:'<path d="M28 88L42 32H100L114 88Z" fill="#c98282"/><path d="M28 88L42 32H100L114 88Z" fill="none" stroke="#713c48" stroke-width="5"/>',
      default:'<rect x="25" y="30" width="90" height="70"/><path d="M25 30l90 70M115 30L25 100"/>',
      none:'<circle cx="70" cy="65" r="32" fill="none"/><path d="M40 35l60 60"/>',
      drawmode:'<rect x="25" y="30" width="90" height="70"/><circle cx="70" cy="65" r="24"/><path d="M25 65h90" stroke-dasharray="4 4"/>',
      screen:'<rect x="20" y="25" width="100" height="75" rx="5"/><path d="M45 112h50M70 100v12"/>',
      chart:'<path d="M25 105V75h18v30M55 105V45h18v60M85 105V60h18v45"/>',
      artboard:'<rect x="25" y="25" width="90" height="80"/><path d="M15 40V15h25M100 15h25v25M125 90v25h-25"/>',
      slice:'<rect x="25" y="25" width="90" height="80"/><path d="M55 25v80M85 25v80M25 65h90"/>',
      hand:'<path d="M45 90V48q0-10 10-10t10 10V25q0-10 10-10t10 10v35q0 35-30 35H65q-15 0-20-18z"/>',
      zoom:'<circle cx="62" cy="58" r="30"/><path d="M85 82l32 28M62 42v32M46 58h32"/>',
      copy:'<rect x="28" y="35" width="55" height="65"/><rect x="48" y="20" width="55" height="65"/>',
      undo:'<path d="M45 40H20l25-22M20 40q0 60 60 60 40 0 40-35"/>',
      keyboard:'<rect x="20" y="35" width="100" height="60" rx="8"/><path d="M35 50h10m10 0h10m10 0h10m10 0h10M35 70h10m10 0h10m10 0h10m10 0h10"/>',
      panels:'<rect x="20" y="25" width="100" height="80"/><path d="M20 45h100M50 45v60"/>',
      selectall:'<rect x="30" y="35" width="80" height="60" stroke-dasharray="5 4"/><path d="M45 50h50v30H45z"/>',
      layers:'<path d="M20 50l50-25 50 25-50 25zM20 70l50 25 50-25M20 88l50 25 50-25"/>'
    };
    const scene = drawings[kind] || drawings.default;
    const toolbar = Array.from({length:24}, (_,i) => {
      const x = 20 + (i%2)*30, y = 74 + Math.floor(i/2)*27;
      return `<rect x="${x}" y="${y}" width="19" height="19" rx="2" fill="none" stroke="#aeb2b8" stroke-width="1"/><path d="M${x+4} ${y+14}l10-10m-7 0h7v7" fill="none" stroke="#d9dde2" stroke-width="1.3"/>`;
    }).join('');
    return `<svg class="scenario-illustration illustrator-workspace" viewBox="0 0 960 470" role="img" aria-label="Illustrator-style fashion design workspace showing a design situation">
      <rect width="960" height="470" rx="8" fill="#242424"/>
      <rect x="0" y="0" width="960" height="48" fill="#303030"/>
      <circle cx="20" cy="22" r="7" fill="#e66b69"/><circle cx="43" cy="22" r="7" fill="#e5bd4f"/><circle cx="66" cy="22" r="7" fill="#6cbd73"/>
      <text x="480" y="29" fill="#f2f2f2" font-size="16" text-anchor="middle" font-family="Arial,sans-serif">Adobe Illustrator · Workspace Simulation</text>
      <rect x="0" y="48" width="960" height="38" fill="#3a3a3a"/>
      <text x="18" y="72" fill="#e8e8e8" font-size="12" font-family="Arial,sans-serif">Selection</text>
      <rect x="118" y="57" width="38" height="20" rx="3" fill="#555"/><rect x="166" y="57" width="38" height="20" rx="3" fill="#555"/>
      <text x="230" y="72" fill="#d7d7d7" font-size="12" font-family="Arial,sans-serif">Fill</text><rect x="258" y="56" width="24" height="22" fill="#c98282"/>
      <text x="302" y="72" fill="#d7d7d7" font-size="12" font-family="Arial,sans-serif">Stroke</text><rect x="350" y="56" width="24" height="22" fill="#fff" stroke="#aaa"/>
      <rect x="0" y="86" width="62" height="384" fill="#303030"/><g>${toolbar}</g>
      <rect x="62" y="86" width="898" height="384" fill="#55585c"/>
      <rect x="156" y="112" width="710" height="330" fill="#fff" stroke="#d5d5d5"/>
      <g transform="translate(510 278) scale(2.15) translate(-70 -65)" fill="none" stroke="#344d86" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${scene}</g>
      <text x="72" y="112" fill="#e5e5e5" font-size="10" font-family="Arial,sans-serif">Artboard 1</text>
      <rect x="884" y="96" width="64" height="355" fill="#383838"/><text x="895" y="118" fill="#ddd" font-size="11" font-family="Arial,sans-serif">Layers</text>
      <path d="M892 134h48M892 157h48M892 180h48" stroke="#666"/>
    </svg>`;
  }

  function renderScenario() {
    const pool=scenarioPool;
    if(scenarioIndex>=pool.length){setScreen('scenarioResult');return;}
    const q=pool[scenarioIndex], correctItem=activeChapter.items.find(x=>x.id===q.itemId);
    if(!scenarioOptions[q.itemId]) scenarioOptions[q.itemId]=shuffle([correctItem,...shuffle(activeChapter.items.filter(x=>x.id!==q.itemId)).slice(0,3)]).map(x=>x.id);
    const options=scenarioOptions[q.itemId].map(id=>activeChapter.items.find(x=>x.id===id)).filter(Boolean);
    const used=scenarioAttempts[q.itemId]||0;
    app.innerHTML=`
      <section class="content-shell narrow-shell">
        <div class="breadcrumb"><button class="text-button" id="scenario-exit">← ${t('chapters')}</button><span>/</span><span>${esc(localized(activeChapter.title))}</span></div>
        <div class="section-heading"><div class="eyebrow">${t('scenarioMode')}</div><h1>${t('scenarioQuestion')} ${scenarioIndex+1}/${pool.length}</h1><p>${t('scenarioInstruction')}</p></div>
        <article class="scenario-card">
          <div class="scenario-visual"><div class="scenario-artboard">${scenarioArtwork(q.visual)}</div><span class="scenario-visual-caption">THE FASHION ATELIER · TASK ${String(scenarioIndex+1).padStart(2,'0')}</span></div>
          <p class="scenario-prompt">${esc(localized(q.prompt))}</p>
        </article>
        <div class="scenario-options">${options.map(item=>`<button class="scenario-option" data-option="${esc(item.id)}">${toolIcon(item)}<span><strong>${esc(localized(item.name))}</strong><small>${item.shortcut?esc(item.shortcut):t('noShortcut')}</small></span></button>`).join('')}</div>
        <div id="scenario-feedback" class="match-feedback" aria-live="polite" ${used?'':'hidden'}>${used?`<strong>${t('incorrect')}</strong> ${esc(lang==='th'?`ลองอีกครั้ง · เหลือ ${Math.max(0,3-used)} ครั้ง`:`Try again · ${Math.max(0,3-used)} attempts left`)}`:''}</div>
      </section>`;
    document.getElementById('scenario-exit').onclick=()=>setScreen('chapters');
    app.querySelectorAll('[data-option]').forEach(btn=>btn.onclick=()=>answerScenario(btn,q,correctItem));
  }

  function answerScenario(btn,q,correctItem) {
    if (btn.disabled || scenarioResolved[q.itemId]) return;

    const feedback = document.getElementById('scenario-feedback');
    const isCorrect = btn.dataset.option === q.itemId;

    if (isCorrect) {
      scenarioAttempts[q.itemId] = scenarioAttempts[q.itemId] || 0;
      scenarioCorrect++;
      scenarioResolved[q.itemId] = true;
      app.querySelectorAll('.scenario-option').forEach(option => {
        option.disabled = true;
        if (option.dataset.option === q.itemId) option.classList.add('is-correct');
      });
      feedback.hidden = false;
      feedback.classList.remove('feedback-wrong');
      feedback.classList.add('feedback-correct');
      feedback.innerHTML = `<strong>${t('scenarioCorrect')}</strong><br>${esc(localized(correctItem.feedbackCorrect || correctItem.description))}<button class="primary-button scenario-next" id="scenario-next">${scenarioIndex===scenarioPool.length-1?t('viewResults'):t('nextQuestion')} →</button>`;
      document.getElementById('scenario-next').onclick = () => { scenarioIndex++; renderScenario(); };
      return;
    }

    // Count incorrect selections only. The correct answer is never highlighted
    // or named until the learner has made three incorrect attempts.
    scenarioAttempts[q.itemId] = (scenarioAttempts[q.itemId] || 0) + 1;
    scenarioWrong++;
    const wrongCount = scenarioAttempts[q.itemId];
    btn.disabled = true;
    btn.classList.add('is-wrong');
    feedback.hidden = false;
    feedback.classList.remove('feedback-correct');
    feedback.classList.add('feedback-wrong');

    if (wrongCount < 3) {
      const remaining = 3 - wrongCount;
      feedback.innerHTML = `<strong>${t('scenarioIncorrect')}</strong><br>${esc(lang==='th' ? `ตัวเลือกนี้ไม่ถูกต้อง คุณยังเลือกตัวเลือกอื่นได้อีก ${remaining} ครั้ง ระบบยังไม่เฉลย` : `That choice is incorrect. You have ${remaining} more attempt(s). The answer is still hidden.`)}`;
      return;
    }

    scenarioResolved[q.itemId] = true;
    app.querySelectorAll('.scenario-option').forEach(option => {
      option.disabled = true;
      if (option.dataset.option === q.itemId) option.classList.add('is-correct');
    });
    feedback.innerHTML = `<strong>${t('revealed')}: ${esc(localized(correctItem.name))}</strong><br>${esc(localized(correctItem.feedbackCorrect || correctItem.description))}<button class="primary-button scenario-next" id="scenario-next">${scenarioIndex===scenarioPool.length-1?t('viewResults'):t('nextQuestion')} →</button>`;
    document.getElementById('scenario-next').onclick = () => { scenarioIndex++; renderScenario(); };
  }


  // Chapter 06: interactive shortcut practice. Only shortcuts explicitly
  // present in the supplied chapter content are used; unverified entries stay in review.
  function beginKeyboardRound() {
    const mac = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
    const mod = mac ? 'Meta' : 'Control';
    const modLabel = mac ? '⌘ Command' : 'Ctrl';
    const definitions = [
      {id:'copy', itemId:'shortcut_copy_paste_cut', key:'C', prompt:{th:'ต้องการคัดลอกวัตถุที่เลือก เพื่อเก็บต้นฉบับไว้และนำสำเนาไปใช้ต่อ ควรกดคีย์ลัดใด?',en:'You want to copy the selected object while keeping the original. Which shortcut should you press?'}, keys:[mod,'C'], label:`${modLabel} + C`, explanation:{th:'ใช้คัดลอกวัตถุหรือข้อความที่เลือก โดยเก็บต้นฉบับไว้ในตำแหน่งเดิม สามารถนำสำเนาไปวางในตำแหน่งอื่นได้',en:'Copies the selected object or text while keeping the original in place. You can paste the copy elsewhere.'}},
      {id:'paste', itemId:'shortcut_copy_paste_cut', key:'V', prompt:{th:'หลังจากคัดลอกวัตถุแล้ว ต้องการวางสำเนาลงในงาน ควรกดคีย์ลัดใด?',en:'After copying an object, you want to paste the duplicate into your artwork. Which shortcut should you press?'}, keys:[mod,'V'], label:`${modLabel} + V`, explanation:{th:'ใช้วางวัตถุหรือข้อความที่คัดลอกหรือตัดไว้ลงในเอกสาร',en:'Pastes the object or text that you copied or cut into the document.'}},
      {id:'cut', itemId:'shortcut_copy_paste_cut', key:'X', prompt:{th:'ต้องการตัดวัตถุที่เลือกออกจากตำแหน่งเดิม เพื่อนำไปวางที่อื่น ควรกดคีย์ลัดใด?',en:'You want to cut the selected object from its current position so you can paste it elsewhere. Which shortcut should you press?'}, keys:[mod,'X'], label:`${modLabel} + X`, explanation:{th:'ใช้ตัดวัตถุหรือข้อความที่เลือกออกจากตำแหน่งเดิม เพื่อย้ายไปวางตำแหน่งอื่น',en:'Cuts the selected object or text from its current position so it can be pasted elsewhere.'}},
      {id:'undo', itemId:'shortcut_undo_redo', key:'Z', prompt:{th:'คุณเพิ่งทำการแก้ไขผิดพลาด และต้องการย้อนกลับการกระทำล่าสุด ควรกดคีย์ลัดใด?',en:'You made an unwanted edit and want to undo the most recent action. Which shortcut should you press?'}, keys:[mod,'Z'], label:`${modLabel} + Z`, explanation:{th:'ใช้ย้อนกลับการกระทำล่าสุด เช่น การวาด การย้าย หรือการแก้ไขวัตถุ',en:'Undoes the most recent action, such as drawing, moving, or editing an object.'}},
      {id:'panels', itemId:'shortcut_panels', key:'Tab', prompt:{th:'ต้องการซ่อนแผงควบคุมทั้งหมดชั่วคราวเพื่อเพิ่มพื้นที่ทำงาน ควรกดปุ่มใด?',en:'You want to temporarily hide all panels to create more workspace. Which key should you press?'}, keys:['Tab'], label:'Tab', explanation:{th:'ใช้ซ่อนหรือแสดงแผงเครื่องมือและแผงควบคุม เพื่อเพิ่มพื้นที่ทำงานบนหน้าจอ',en:'Hides or shows panels to create more workspace on the screen.'}},
      {id:'selectall', itemId:'shortcut_select_all', key:'A', prompt:{th:'ต้องการเลือกวัตถุทั้งหมดในเอกสารปัจจุบัน ควรกดคีย์ลัดใด?',en:'You want to select all objects in the current document. Which shortcut should you press?'}, keys:[mod,'A'], label:`${modLabel} + A`, explanation:{th:'ใช้เลือกวัตถุทั้งหมดในเอกสารหรือบริบทที่กำลังทำงานอยู่',en:'Selects all objects in the current document or active context.'}},
      {id:'selection', itemId:'shortcut_tool_switch', key:'V', prompt:{th:'ต้องการเปลี่ยนไปใช้ Selection Tool เพื่อเลือกและย้ายวัตถุทั้งชิ้น ควรกดปุ่มใด?',en:'You want to activate the Selection Tool to select and move an entire object. Which key should you press?'}, keys:['V'], label:'V', explanation:{th:'Selection Tool ใช้เลือกวัตถุทั้งชิ้น เคลื่อนย้าย และปรับขนาดวัตถุ',en:'The Selection Tool selects entire objects so you can move and resize them.'}},
      {id:'directselection', itemId:'shortcut_tool_switch', key:'A', prompt:{th:'ต้องการเปลี่ยนไปใช้ Direct Selection Tool เพื่อแก้ไข Anchor Point ควรกดปุ่มใด?',en:'You want to activate the Direct Selection Tool to edit anchor points. Which key should you press?'}, keys:['A'], label:'A', explanation:{th:'Direct Selection Tool ใช้เลือกและแก้ไข Anchor Points หรือส่วนของเส้น Path',en:'The Direct Selection Tool selects and edits anchor points or path segments.'}},
      {id:'pen', itemId:'shortcut_tool_switch', key:'P', prompt:{th:'ต้องการเปลี่ยนไปใช้ Pen Tool เพื่อสร้างเส้น Path ควรกดปุ่มใด?',en:'You want to activate the Pen Tool to create a path. Which key should you press?'}, keys:['P'], label:'P', explanation:{th:'Pen Tool ใช้สร้างเส้น Path โดยกำหนด Anchor Points เพื่อสร้างเส้นตรงและเส้นโค้งอย่างแม่นยำ',en:'The Pen Tool creates paths by placing anchor points to form precise straight and curved segments.'}}
    ];
    keyboardTasks = shuffle(definitions).slice(0,5);
    keyboardIndex=0; keyboardWrong=0; keyboardAttempts={}; keyboardResolved={}; keyboardCorrect=0; virtualModifiers=new Set();
    setScreen('keyboard');
  }

  function isMacPlatform() {
    return /Mac|iPhone|iPad|iPod/i.test((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent);
  }
  function keyboardDisplayName(key) {
    if (key === 'Control') return isMacPlatform() ? 'Control' : 'Ctrl';
    if (key === 'Meta') return '⌘ Command';
    if (key === 'Alt') return isMacPlatform() ? 'Option' : 'Alt';
    return key;
  }
  function updateKeyboardPressed() {
    const el = document.getElementById('keyboard-pressed');
    if (el) el.textContent = [...virtualModifiers].map(keyboardDisplayName).join(' + ') || '—';
    app.querySelectorAll('[data-key]').forEach(btn => {
      const key = btn.dataset.key;
      const canonical = canonicalVirtualKey(key);
      btn.classList.toggle('key-active', virtualModifiers.has(canonical));
    });
  }
  function canonicalVirtualKey(key) {
    if (key === 'Ctrl' || key === 'Control') return 'Control';
    if (key === '⌘ Command' || key === 'Command' || key === 'Win') return 'Meta';
    if (key === 'Alt' || key === 'Option') return 'Alt';
    return normalizeKey(key);
  }
  function renderKeyboardChallenge() {
    if (keyboardIndex >= keyboardTasks.length) { renderKeyboardResult(); return; }
    const task=keyboardTasks[keyboardIndex], mac=isMacPlatform();
    const rows=[['Esc','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],['Tab','Q','W','E','R','T','Y','U','I','O','P','[',']'],['Caps','A','S','D','F','G','H','J','K','L',';','Enter'],['Shift','Z','X','C','V','B','N','M',',','.','/','Shift'],[mac?'Control':'Ctrl',mac?'Option':'Alt',mac?'⌘ Command':'Win','Space',mac?'Option':'Alt','←','↑','↓','→']];
    const attempts=keyboardAttempts[task.id]||0;
    const instructions = lang==='th'
      ? 'วิธีตอบ: อ่านสถานการณ์ แล้วกดคีย์ลัดจากคีย์บอร์ดจริง หรือคลิกปุ่มบนคีย์บอร์ดจำลอง ระบบจะตรวจคำตอบให้อัตโนมัติทันทีเมื่อกดชุดปุ่มครบ หากตอบผิด คุณสามารถลองใหม่ได้รวม 3 ครั้ง'
      : 'How to answer: Read the task, then press the shortcut on your physical keyboard or click the keys on the virtual keyboard. Your answer is checked automatically as soon as the shortcut is complete. You have up to 3 attempts.';
    app.innerHTML=`
      <section class="content-shell narrow-shell keyboard-challenge">
        <div class="breadcrumb"><button class="text-button" id="keyboard-exit">← ${t('chapters')}</button><span>/</span><span>${esc(localized(activeChapter.title))}</span></div>
        <div class="section-heading"><div class="eyebrow">CHAPTER 06 · KEYBOARD PRACTICE</div><h1>${lang==='th'?'สถานการณ์':'Shortcut task'} ${keyboardIndex+1}/${keyboardTasks.length}</h1><p>${lang==='th'?'ฝึกกดคีย์ลัดเพื่อทำงานใน Adobe Illustrator':'Practice keyboard shortcuts for Adobe Illustrator tasks.'}</p></div>
        <aside class="keyboard-instructions" role="note"><strong>${lang==='th'?'คำชี้แจง':'Instructions'}</strong><p>${esc(instructions)}</p></aside>
        <article class="keyboard-task-card"><span class="keyboard-task-label">${lang==='th'?'สถานการณ์ในงานออกแบบ':'DESIGN WORKFLOW'}</span><h2>${esc(localized(task.prompt))}</h2><p>${lang==='th'?'ระบบที่ตรวจจับ':'Detected platform'}: <strong>${mac?'macOS · Command':'Windows · Ctrl'}</strong></p></article>
        <div class="keyboard-status"><span>${lang==='th'?'ปุ่มที่กด':'Keys pressed'}</span><strong id="keyboard-pressed">${[...virtualModifiers].map(keyboardDisplayName).join(' + ') || '—'}</strong></div>
        <div class="virtual-keyboard" aria-label="Virtual keyboard">
          ${rows.map(row=>`<div class="keyboard-row">${row.map(key=>`<button type="button" class="virtual-key ${key==='Space'?'key-space':''} ${virtualModifiers.has(canonicalVirtualKey(key))?'key-active':''}" data-key="${esc(key)}">${esc(key)}</button>`).join('')}</div>`).join('')}
        </div>
        <div id="keyboard-feedback" class="match-feedback" aria-live="polite" ${attempts?'':'hidden'}></div>
      </section>`;
    document.getElementById('keyboard-exit').onclick=()=>{detachKeyboardListener();setScreen('chapters');};
    app.querySelectorAll('[data-key]').forEach(btn=>btn.onclick=()=>handleVirtualKey(btn.dataset.key));
    attachKeyboardListener();
  }

  function normalizeKey(k) {
    if (k==='Control') return 'Control';
    if (k==='Meta') return 'Meta';
    if (k===' ') return 'Space';
    if (k==='Esc') return 'Escape';
    return k.length===1 ? k.toUpperCase() : k;
  }
  function handleVirtualKey(key) {
    if (screen!=='keyboard') return;
    const canonical=canonicalVirtualKey(key);
    const modifier=['Control','Meta','Alt','Shift'].includes(canonical);
    if (modifier) {
      if (virtualModifiers.has(canonical)) virtualModifiers.delete(canonical);
      else virtualModifiers.add(canonical);
      updateKeyboardPressed();
      return;
    }
    const keys=[...virtualModifiers,canonical];
    evaluateKeyboardAnswer(keys);
  }
  function attachKeyboardListener() {
    detachKeyboardListener();
    keyboardPhysicalHandler=(e)=>{
      if(screen!=='keyboard') return;
      const k=normalizeKey(e.key);
      if (['Control','Meta','Shift','Alt'].includes(k)) {
        if (k==='Control') virtualModifiers.add('Control');
        if (k==='Meta') virtualModifiers.add('Meta');
        if (k==='Alt') virtualModifiers.add('Alt');
        if (k==='Shift') virtualModifiers.add('Shift');
        updateKeyboardPressed();
        return;
      }
      const isRelevant=e.ctrlKey||e.metaKey||e.altKey||k==='Tab'||['V','A','P'].includes(k);
      if(!isRelevant) return;
      e.preventDefault();
      const keys=[];
      if(e.ctrlKey) keys.push('Control');
      if(e.metaKey) keys.push('Meta');
      if(e.altKey) keys.push('Alt');
      if(e.shiftKey) keys.push('Shift');
      keys.push(k);
      evaluateKeyboardAnswer(keys);
    };
    window.addEventListener('keydown',keyboardPhysicalHandler,true);
  }
  function detachKeyboardListener() {
    if(keyboardPhysicalHandler) window.removeEventListener('keydown',keyboardPhysicalHandler,true);
    keyboardPhysicalHandler=null;
  }
  function evaluateKeyboardAnswer(keys) {
    const task=keyboardTasks[keyboardIndex]; if(!task||keyboardResolved[task.id]) return;
    const normalized=[...new Set(keys)].sort().join('+');
    const expected=[...task.keys].sort().join('+');
    const ok=normalized===expected;
    const feedback=document.getElementById('keyboard-feedback');
    if(!feedback) return;
    virtualModifiers=new Set(keys);
    updateKeyboardPressed();
    if(ok) {
      keyboardResolved[task.id]=true; keyboardCorrect++;
      feedback.hidden=false; feedback.className='match-feedback feedback-correct';
      feedback.innerHTML=`<strong>${lang==='th'?'ถูกต้อง!':'Correct!'}</strong> <b>${esc(task.label)}</b><br>${esc(localized(task.explanation))}<br><button class="primary-button scenario-next" id="keyboard-next">${keyboardIndex===keyboardTasks.length-1?t('viewResults'):(lang==='th'?'ข้อต่อไป':'Next task')} →</button>`;
      app.querySelectorAll('[data-key]').forEach(btn=>btn.disabled=true);
      document.getElementById('keyboard-next').onclick=()=>{keyboardIndex++;virtualModifiers.clear();renderKeyboardChallenge();};
    } else {
      keyboardAttempts[task.id]=(keyboardAttempts[task.id]||0)+1; keyboardWrong++;
      const count=keyboardAttempts[task.id];
      const pressedLabel=keys.map(keyboardDisplayName).join(' + ');
      feedback.hidden=false; feedback.className='match-feedback feedback-wrong';
      if(count<3) {
        feedback.innerHTML=`<strong>${lang==='th'?'ยังไม่ถูกต้อง ลองอีกครั้ง':'Not quite. Try again'}</strong><br>${lang==='th'?`คุณกด ${esc(pressedLabel)} ซึ่งยังไม่ตรงกับคีย์ลัดของโจทย์`:`You pressed ${esc(pressedLabel)}, which does not match this task.`}<br><span>${lang==='th'?`เหลือโอกาสอีก ${3-count} ครั้ง`:`${3-count} attempt(s) remaining`}</span>`;
        virtualModifiers.clear();
        updateKeyboardPressed();
      } else {
        keyboardResolved[task.id]=true;
        feedback.innerHTML=`<strong>${lang==='th'?'ครบ 3 ครั้งแล้ว · เฉลย':'No attempts left · Answer'}</strong> <b>${esc(task.label)}</b><br>${esc(localized(task.explanation))}<br><button class="primary-button scenario-next" id="keyboard-next">${keyboardIndex===keyboardTasks.length-1?t('viewResults'):(lang==='th'?'ข้อต่อไป':'Next task')} →</button>`;
        app.querySelectorAll('[data-key]').forEach(btn=>btn.disabled=true);
        virtualModifiers.clear(); updateKeyboardPressed();
        document.getElementById('keyboard-next').onclick=()=>{keyboardIndex++;virtualModifiers.clear();renderKeyboardChallenge();};
      }
    }
  }

  function renderKeyboardResult() {
    detachKeyboardListener();
    app.innerHTML=`<section class="welcome-card result-screen"><div class="eyebrow">CHAPTER 06 · KEYBOARD PRACTICE</div><h1>${lang==='th'?'สรุปผลการฝึกคีย์ลัด':'Keyboard Practice Results'}</h1><div class="result-grid"><div class="result-stat"><strong>${keyboardCorrect}/${keyboardTasks.length}</strong><span>${lang==='th'?'ตอบถูก':'Correct'}</span></div><div class="result-stat"><strong>${keyboardWrong}</strong><span>${t('wrongAttempts')}</span></div></div><div class="result-actions"><button class="primary-button" id="keyboard-replay">${t('replay')}</button><button class="secondary-button" id="keyboard-chapters">${t('chapters')}</button></div></section>`;
    document.getElementById('keyboard-replay').onclick=()=>beginKeyboardRound();
    document.getElementById('keyboard-chapters').onclick=()=>setScreen('chapters');
  }

  function renderScenarioResult() {
    const total=scenarioPool.length;
    app.innerHTML=`<section class="welcome-card result-screen"><div class="eyebrow">${t('scenarioResult')}</div><h1>${t('scenarioResult')}</h1><div class="result-grid"><div class="result-stat"><strong>${scenarioCorrect}/${total}</strong><span>${t('scenarioScore')}</span></div><div class="result-stat"><strong>${scenarioWrong}</strong><span>${t('wrongAttempts')}</span></div></div><div class="result-actions"><button class="primary-button" id="scenario-replay">${t('replay')}</button><button class="secondary-button" id="scenario-chapters">${t('chapters')}</button></div></section>`;
    document.getElementById('scenario-replay').onclick=()=>{scenarioIndex=0;scenarioCorrect=0;scenarioWrong=0;scenarioAttempts={};scenarioOptions={};scenarioResolved={};const scenarioBank=buildScenarioPool();scenarioPool=shuffle(scenarioBank).slice(0,Math.min(5,scenarioBank.length));setScreen('scenario');};
    document.getElementById('scenario-chapters').onclick=()=>setScreen('chapters');
  }

  function beginMatchingRound() {
    const bank = (activeChapter?.matching?.pairs || []).filter(pair =>
      activeChapter.items.some(item => item.id === pair.itemId)
    );
    const completedIds = (!previewMode && typeof recordAdapter !== 'undefined')
      ? recordAdapter.getChapterProgress(PLAYER_ID, activeChapter.id, bank.map(p => p.id)).completedPairIds
      : (sessionCompletedPairIds[activeChapter.id] || []);
    const remainingBank = bank.filter(pair => !completedIds.includes(pair.id));
    if (!remainingBank.length) {
      roundPairs = [];
      setScreen('result');
      return;
    }
    roundPairs = shuffle(remainingBank).slice(0, Math.min(5, remainingBank.length));
    pairAttempts = {};
    roundPairs.forEach(pair => { pairAttempts[pair.itemId] = 0; });
    matchedIds = new Set();
    revealedIds = new Set();
    selectedToolId = null;
    lastChoice = null;
    lastFeedback = null;
    stats = freshStats();
    pairStart = Date.now();
    if (matchingRoundsPlayed > 0 && !previewMode && typeof recordAdapter !== 'undefined') {
      attemptId = recordAdapter.startAttempt(PLAYER_ID, activeChapter.id, activeChapter.contentVersion || 1);
      sendRemoteAttemptStart();
    }
    attemptStartedAt = Date.now();
    matchingRoundsPlayed++;
    setScreen('matching');
  }

  function renderMatching() {
    const ch = activeChapter;
    const pairs = roundPairs;
    const toolItems = ch.items.filter(item => pairs.some(pair => pair.itemId === item.id));
    if (!pairs.length) {
      app.innerHTML = `<section class="content-shell"><h1>${t('loadError')}</h1><p>No matching pairs are available for this chapter.</p><button class="secondary-button" id="matching-empty-back">${t('back')}</button></section>`;
      document.getElementById('matching-empty-back').onclick=()=>setScreen('activity');
      return;
    }
    if (!Object.keys(pairAttempts).length) pairs.forEach(p => pairAttempts[p.itemId] = 0);
    const roundIds = new Set(pairs.map(pair => pair.itemId));
    const toolOrder = shuffle(toolItems.filter(item => roundIds.has(item.id) && !matchedIds.has(item.id) && !revealedIds.has(item.id)));
    const promptOrder = shuffle(pairs.filter(p => !matchedIds.has(p.itemId) && !revealedIds.has(p.itemId)));
    app.innerHTML = `
      <section class="content-shell">
        <div class="breadcrumb"><button class="text-button" id="matching-back">← ${t('back')}</button><span>/</span><span>${esc(localized(ch.title))}</span></div>
        <div class="section-heading"><div class="eyebrow">${t('chapter')} ${String(ch.order).padStart(2,'0')} · ${t('matchingIntro')}</div><h1>${t('matchingIntro')}</h1><p>${t('matchingInstruction')}</p></div>
        <div class="matching-dashboard">
          <div class="matching-dashboard-top"><div><span class="eyebrow">${t('chapterProgress')}</span><strong>${esc(localized(ch.title))}</strong></div><span class="matching-round-label">${t('roundComplete')} · ${pairs.length} ${t('item')}</span></div>
          <div class="matching-progress"><span>${t('completed')}: ${matchedIds.size + revealedIds.size}/${pairs.length}</span><div class="progress-track"><i style="width:${((matchedIds.size+revealedIds.size)/pairs.length)*100}%"></i></div></div>
          <div class="matching-bank-progress"><span>${t('chapterProgress')}</span><strong>${chapterProgress(ch).percent}%</strong><div class="progress-track"><i style="width:${chapterProgress(ch).percent}%"></i></div><small>${chapterProgress(ch).completed}/${chapterProgress(ch).total} · ${chapterProgress(ch).remaining} ${t('remaining')}</small></div>
        </div>
        <div class="matching-columns">
          <div class="matching-column"><h2>${t('tools')}</h2><div class="match-list" id="tool-list">
            ${toolOrder.map(item=>`<button class="match-tool ${lastChoice && !lastChoice.correct && lastChoice.toolId===item.id ? 'is-wrong' : ''}" draggable="true" data-tool="${esc(item.id)}">${toolIcon(item)}<span class="match-tool-copy"><strong>${esc(localized(item.name))}</strong>${item.shortcut?`<small>${esc(item.shortcut)}</small>`:''}</span></button>`).join('')}
          </div></div>
          <div class="matching-column"><h2>${t('functions')}</h2><div class="match-list" id="prompt-list">
            ${promptOrder.map(pair=>{
              const item=toolItems.find(x=>x.id===pair.itemId);
              return `<button class="match-prompt ${lastChoice && !lastChoice.correct && lastChoice.targetId===pair.itemId ? 'is-wrong' : ''}" data-target="${esc(pair.itemId)}" data-pair="${esc(pair.id)}"><span>${esc(localized(item.matchingPrompt))}</span><small>${t('dropHere')}</small></button>`;
            }).join('')}
          </div></div>
        </div>
        <div id="match-feedback" class="match-feedback" ${lastFeedback?'':'hidden'}>${lastFeedback||''}</div>
        <div class="page-actions"><button class="secondary-button" id="quit-match">${t('chapters')}</button><button class="primary-button" id="match-results" ${matchedIds.size+revealedIds.size===pairs.length?'':'disabled'}>${t('viewResults')} →</button></div>
      </section>`;
    document.getElementById('matching-back').onclick = () => setScreen('review');
    document.getElementById('quit-match').onclick = () => setScreen('chapters');
    document.getElementById('match-results').onclick = () => finishChapter();

    app.querySelectorAll('.match-tool').forEach(btn => {
      btn.addEventListener('click',()=>selectTool(btn.dataset.tool));
      btn.addEventListener('dragstart',e=>{ e.dataTransfer.setData('text/plain',btn.dataset.tool); });
    });
    app.querySelectorAll('.match-prompt').forEach(btn => {
      btn.addEventListener('click',()=>{ if(selectedToolId) checkMatch(selectedToolId,btn); });
      btn.addEventListener('dragover',e=>e.preventDefault());
      btn.addEventListener('drop',e=>{e.preventDefault();const id=e.dataTransfer.getData('text/plain');if(id)checkMatch(id,btn);});
    });
  }

  function selectTool(id) {
    selectedToolId = id;
    app.querySelectorAll('.match-tool').forEach(b=>b.classList.toggle('is-selected',b.dataset.tool===id));
  }

  function checkMatch(selectedId, promptButton) {
    if (!promptButton || promptButton.disabled) return;
    const targetId = promptButton.dataset.target;
    const pairId = promptButton.dataset.pair;
    const item = activeChapter.items.find(x=>x.id===targetId);
    const selectedItem = activeChapter.items.find(x=>x.id===selectedId);
    if (!selectedItem) return;
    const attemptNum = (pairAttempts[targetId] || 0) + 1;
    const correct = selectedId === targetId;
    const timeSpent = Date.now() - pairStart;
    pairStart = Date.now();
    let revealed = false;
    let message = '';

    lastChoice = {toolId:selectedId,targetId,correct};
    if (correct) {
      pairAttempts[targetId] = attemptNum;
      matchedIds.add(targetId);
      if (attemptNum === 1) stats.firstTimeCorrect++;
      stats.totalCorrect++;
      message = `<strong>${t('correct')}</strong> ${esc(localized(item.feedbackCorrect))}`;
      promptButton.classList.add('is-matched');
      promptButton.innerHTML = `<strong>${esc(localized(item.name))}</strong><small>${t('matched')}</small>`;
      promptButton.disabled = true;
      const toolButton = app.querySelector(`[data-tool="${CSS.escape(targetId)}"]`);
      if (toolButton) toolButton.remove();
    } else {
      pairAttempts[targetId] = attemptNum;
      stats.totalIncorrectAttempts++;
      const remaining = activeChapter.matching.maxAttemptsPerPair - attemptNum;
      if (remaining <= 0) {
        revealed = true;
        revealedIds.add(targetId);
        stats.totalRevealed++;
        message = `<strong>${t('revealed')}</strong> ${esc(localized(item.name))} — ${esc(localized(item.description))}`;
        promptButton.classList.add('is-revealed');
        promptButton.innerHTML = `<strong>${esc(localized(item.name))}</strong><small>${t('revealed')}</small>`;
        promptButton.disabled = true;
        const correctTool = app.querySelector(`[data-tool="${CSS.escape(targetId)}"]`);
        if (correctTool) correctTool.remove();
      } else {
        message = `<strong>${t('incorrect')}</strong> ${esc(localized(item.feedbackIncorrect))}<br><small>${t('attemptsLeft')}: ${remaining}</small>`;
      }
    }

    if (!previewMode && typeof recordAdapter !== 'undefined') {
      recordAdapter.recordAnswer(attemptId,pairId,selectedId,correct,attemptNum,timeSpent,revealed);
      queueWixWrite('recordAnswer', {
        answerId: `ans_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        attemptId,
        chapterId: activeChapter.id,
        pairId,
        selectedItemId: selectedId,
        attemptNum,
        isCorrect: correct,
        isRevealed: revealed,
        timeSpentMs: timeSpent
      });
      if (correct || revealed) {
        recordAdapter.resolveQuestion(PLAYER_ID, activeChapter.id, pairId, (activeChapter.matching?.pairs || []).length);
        queueWixWrite('resolveQuestion', {
          chapterId: activeChapter.id,
          pairId,
          totalQuestions: (activeChapter.matching?.pairs || []).length
        });
      }
    } else if (correct || revealed) {
      sessionCompletedPairIds[activeChapter.id] ||= [];
      if (!sessionCompletedPairIds[activeChapter.id].includes(pairId)) sessionCompletedPairIds[activeChapter.id].push(pairId);
    }
    selectedToolId = null;
    lastFeedback = message;
    renderMatching();
    const fb = document.getElementById('match-feedback');
    if (fb) {
      fb.hidden = false;
      fb.classList.toggle('feedback-correct', correct);
      fb.classList.toggle('feedback-wrong', !correct);
      fb.innerHTML = message;
    }
    const resultButton = document.getElementById('match-results');
    if (matchedIds.size + revealedIds.size === roundPairs.length) resultButton.disabled = false;
  }

  function finishChapter() {
    if (!activeChapter) return;
    if (!previewMode && typeof recordAdapter !== 'undefined') {
      recordAdapter.completeAttempt(attemptId,stats);
      queueWixWrite('completeAttempt', {
        attemptId,
        stats: {
          correctMatches: stats.totalCorrect,
          totalAttempts: stats.totalCorrect + stats.totalIncorrectAttempts,
          timeSpentMs: Math.max(0, Date.now() - attemptStartedAt)
        }
      });
    }
    setScreen('result');
  }

  function renderResult() {
    const total = roundPairs.length;
    const resolved = matchedIds.size + revealedIds.size;
    const progress = chapterProgress(activeChapter);
    const complete = progress.done;
    app.innerHTML = `
      <section class="welcome-card result-screen">
        <div class="eyebrow">${complete ? t('chapterCompleted') : t('roundComplete')} · ${t('chapter')} ${String(activeChapter.order).padStart(2,'0')}</div>
        <h1>${complete ? t('chapterDone') : t('result')}</h1><h2>${esc(localized(activeChapter.title))}</h2>
        <div class="chapter-result-progress">
          <div class="chapter-result-heading"><span>${t('chapterProgress')}</span><strong>${progress.percent}%</strong></div>
          <div class="progress-track"><i style="width:${progress.percent}%"></i></div>
          <p>${progress.completed}/${progress.total} · ${progress.remaining} ${t('remaining')}</p>
        </div>
        <div class="result-grid">
          <div class="result-stat"><strong>${resolved}/${total}</strong><span>${t('completed')}</span></div>
          <div class="result-stat"><strong>${stats.firstTimeCorrect}</strong><span>${t('flawless')}</span></div>
          <div class="result-stat"><strong>${stats.totalIncorrectAttempts}</strong><span>${t('wrongAttempts')}</span></div>
          <div class="result-stat"><strong>${stats.totalRevealed}</strong><span>${t('revealedCount')}</span></div>
        </div>
        <p class="lead">${complete ? t('allQuestionsDone') : esc(localized(activeChapter.resultText))}</p>
        <div class="result-actions">
          ${complete ? `<button class="primary-button" id="replay">${t('replay')}</button>` : `<button class="primary-button" id="next-round">${t('continueRound')} →</button>`}
          <button class="secondary-button" id="to-chapters">${t('chapters')}</button>
        </div>
      </section>`;
    if (complete) document.getElementById('replay').onclick = () => openChapter(activeChapter.id);
    else document.getElementById('next-round').onclick = () => beginMatchingRound();
    document.getElementById('to-chapters').onclick = () => setScreen('chapters');
  }

  langButton.addEventListener('click',()=> {
    if (screen === 'matching') return; // language is locked during an active attempt
    setLanguage(lang === 'th' ? 'en' : 'th');
  });
  document.getElementById('brand-home').addEventListener('click',()=> {
    if (screen !== 'matching') setScreen('home');
  });

  async function boot() {
    app.innerHTML = `<section class="welcome-card"><p>${t('loading')}</p></section>`;
    try {
      await loadAllChapters();
      document.documentElement.lang = lang;
      langButton.textContent = lang === 'th' ? 'EN' : 'TH';
      const params = new URLSearchParams(location.search);
      const previewChapter = params.get('chapter');
      if (params.get('language') === 'select') localStorage.removeItem(LANG_KEY);
      if (previewMode && previewChapter) {
        setScreen('language');
        // In preview, skip the language gate and open requested chapter with saved/default language.
        openChapter(previewChapter);
      } else if (localStorage.getItem(LANG_KEY)) {
        setScreen('home');
      } else {
        setScreen('language');
      }
      if (isWixEmbedded) refreshRemoteProgress();
    } catch (err) {
      app.innerHTML = `<section class="welcome-card"><h1>${t('loadError')}</h1><p>${esc(err.message)}</p><p>Run this project through a local web server (not by opening the HTML file directly).</p></section>`;
      console.error(err);
    }
  }
  boot();
})();
