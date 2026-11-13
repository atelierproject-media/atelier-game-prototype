/**
 * LSE320 / ATELIER — secure Wix Velo backend for Mini Task matching.
 * Install as backend/gameBackend.web.js in the Wix Editor site's Velo code.
 * Student methods require an authenticated Wix Site Member.
 * Member IDs are resolved server-side; answer mappings never leave this module.
 */

import wixData from 'wix-data';
import { currentMember } from 'wix-members-backend';
import { Permissions, webMethod } from 'wix-web-module';

const DATA_OPTIONS = { suppressAuth: true, suppressHooks: true };
const MAX_ANSWER_ATTEMPTS = 3; // Matches the current repository chapter JSON.
const MAX_QUERY_ITEMS = 1000;
const C = {
  chapters: 'GameChapters',
  tasks: 'Tasks',
  pairs: 'MatchingPairs',
  attempts: 'GameAttempts',
  answers: 'AnswerRecords',
  chapterProgress: 'ChapterQuestionProgress',
  memberProgress: 'MemberProgress'
};

function fail(code) {
  throw new Error(code);
}

function cleanId(value, fieldName) {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text || text.length > 128 || !/^[a-zA-Z0-9_-]+$/.test(text)) {
    fail('INVALID_' + fieldName.toUpperCase());
  }
  return text;
}

function safeNumber(value, fallback = 0, max = 600000) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.min(Math.floor(number), max));
}

function localized(th, en) {
  return {
    th: typeof th === 'string' ? th : '',
    en: typeof en === 'string' ? en : ''
  };
}

async function requireMemberId() {
  try {
    const member = await currentMember.getMember({ fieldsets: ['FULL'] });
    if (!member || !member._id) fail('MEMBER_LOGIN_REQUIRED');
    return member._id;
  } catch (error) {
    if (error && String(error.message || '').includes('MEMBER_LOGIN_REQUIRED')) throw error;
    fail('MEMBER_LOGIN_REQUIRED');
  }
}

async function findOne(query) {
  const result = await query.limit(1).find(DATA_OPTIONS);
  return (result.items && result.items[0]) || null;
}

async function queryAll(query) {
  const result = await query.limit(MAX_QUERY_ITEMS).find(DATA_OPTIONS);
  return result.items || [];
}

async function getChapterRecord(chapterId, allowDraft) {
  let query = wixData.query(C.chapters).eq('chapterId', chapterId);
  if (!allowDraft) query = query.eq('status', 'published');
  const chapter = await findOne(query);
  if (!chapter) fail(allowDraft ? 'CHAPTER_NOT_FOUND' : 'CHAPTER_NOT_PUBLISHED');
  return chapter;
}

async function buildChapterBundle(chapterId, allowDraft) {
  const chapter = await getChapterRecord(chapterId, allowDraft);
  const [taskRows, pairRows] = await Promise.all([
    queryAll(
      wixData.query(C.tasks)
        .eq('chapterId', chapterId)
        .eq('isActive', true)
        .ascending('itemId')
    ),
    queryAll(
      wixData.query(C.pairs)
        .eq('chapterId', chapterId)
        .eq('isActive', true)
        .ascending('order')
    )
  ]);

  const taskById = new Map();
  taskRows.forEach((task) => {
    if (task.itemId) taskById.set(task.itemId, task);
  });

  const items = taskRows.map((task) => ({
    id: task.itemId,
    type: task.taskType || 'tool_or_command',
    name: localized(task.nameTh || task.taskName || task.title, task.nameEn || task.taskName || task.title),
    shortcut: task.shortcut || '',
    description: localized(task.descriptionTh, task.descriptionEn),
    matchingPrompt: localized(task.matchingPromptTh, task.matchingPromptEn),
    feedbackCorrect: task.feedbackCorrect || localized('', ''),
    feedbackIncorrect: task.feedbackIncorrect || localized('', ''),
    asset: task.asset || ''
  }));

  // Never return MatchingPairs.itemId or Tasks.correctAnswer to the iframe.
  const pairs = pairRows
    .filter((pair) => pair.pairId && taskById.has(pair.itemId))
    .map((pair) => {
      const task = taskById.get(pair.itemId);
      return {
        id: pair.pairId,
        matchingPrompt: localized(task.matchingPromptTh, task.matchingPromptEn)
      };
    });

  if (!items.length || !pairs.length) fail('CHAPTER_HAS_NO_ACTIVE_MATCHING_CONTENT');

  return {
    id: chapter.chapterId,
    order: chapter.order || 0,
    status: chapter.status,
    contentVersion: chapter.contentVersion || 1,
    title: localized(chapter.titleTh, chapter.titleEn),
    summary: localized(chapter.summaryTh, chapter.summaryEn),
    learningObjectives: chapter.learningObjectives || { th: [], en: [] },
    intro: chapter.intro || localized('', ''),
    resultText: chapter.resultText || localized('', ''),
    items,
    matching: {
      mode: 'one-to-one',
      maxAttemptsPerPair: MAX_ANSWER_ATTEMPTS,
      revealAfterMaxAttempts: true,
      feedbackTiming: 'after-each-pair',
      interactionModes: ['drag-and-drop', 'click-to-match'],
      pairs
    }
  };
}

async function getPairCount(chapterId) {
  const rows = await queryAll(
    wixData.query(C.pairs)
      .eq('chapterId', chapterId)
      .eq('isActive', true)
  );
  return rows.length;
}

async function updateMemberProgress(memberId, chapterId, addPlayTimeMs = 0) {
  const chapterProgress = await findOne(
    wixData.query(C.chapterProgress)
      .eq('memberId', memberId)
      .eq('chapterId', chapterId)
  );
  const current = await findOne(wixData.query(C.memberProgress).eq('memberId', memberId));

  const completedChapters = Array.isArray(current && current.completedChapters)
    ? [...current.completedChapters]
    : [];
  if (chapterProgress && chapterProgress.status === 'completed' && !completedChapters.includes(chapterId)) {
    completedChapters.push(chapterId);
  }

  const record = {
    ...(current || {}),
    memberId,
    completedChapters,
    completedChapterCount: completedChapters.length,
    totalPlayTimeMs: safeNumber(current && current.totalPlayTimeMs, 0, Number.MAX_SAFE_INTEGER) +
      safeNumber(addPlayTimeMs, 0, Number.MAX_SAFE_INTEGER),
    lastActive: new Date()
  };

  if (current && current._id) {
    await wixData.update(C.memberProgress, record, DATA_OPTIONS);
  } else {
    await wixData.insert(C.memberProgress, record, DATA_OPTIONS);
  }
}

async function rebuildChapterProgress(memberId, chapterId) {
  const [answerRows, totalQuestions] = await Promise.all([
    queryAll(
      wixData.query(C.answers)
        .eq('memberId', memberId)
        .eq('chapterId', chapterId)
    ),
    getPairCount(chapterId)
  ]);

  const completedPairIds = [...new Set(
    answerRows
      .filter((answer) => answer.isCorrect === true || answer.isRevealed === true)
      .map((answer) => answer.pairId)
      .filter(Boolean)
  )];
  const completedCount = Math.min(completedPairIds.length, totalQuestions);
  const status = totalQuestions > 0 && completedCount >= totalQuestions
    ? 'completed'
    : completedCount > 0 ? 'in_progress' : 'not_started';
  const existing = await findOne(
    wixData.query(C.chapterProgress)
      .eq('memberId', memberId)
      .eq('chapterId', chapterId)
  );
  const record = {
    ...(existing || {}),
    memberId,
    chapterId,
    completedPairIds,
    completedCount,
    totalQuestions,
    progressPercent: totalQuestions ? Math.round((completedCount / totalQuestions) * 100) : 0,
    status,
    lastUpdated: new Date()
  };

  if (existing && existing._id) {
    await wixData.update(C.chapterProgress, record, DATA_OPTIONS);
  } else {
    await wixData.insert(C.chapterProgress, record, DATA_OPTIONS);
  }

  await updateMemberProgress(memberId, chapterId, 0);
  return {
    chapterId,
    completedPairIds,
    completedCount,
    totalQuestions,
    remaining: Math.max(0, totalQuestions - completedCount),
    progressPercent: totalQuestions ? Math.round((completedCount / totalQuestions) * 100) : 0,
    status
  };
}

function safeMatchedItem(task) {
  if (!task) return null;
  return {
    id: task.itemId,
    name: localized(task.nameTh || task.taskName || task.title, task.nameEn || task.taskName || task.title),
    description: localized(task.descriptionTh, task.descriptionEn),
    shortcut: task.shortcut || '',
    feedbackCorrect: task.feedbackCorrect || localized('', '')
  };
}

export const getChapterBundle = webMethod(Permissions.SiteMember, async ({ chapterId }) => {
  await requireMemberId();
  return buildChapterBundle(cleanId(chapterId, 'chapterId'), false);
});

// Admin-only draft preview. Does not create or save learning records.
export const getChapterBundleForAdmin = webMethod(Permissions.Admin, async ({ chapterId }) => {
  return buildChapterBundle(cleanId(chapterId, 'chapterId'), true);
});

export const startAttempt = webMethod(Permissions.SiteMember, async (payload) => {
  const memberId = await requireMemberId();
  const chapterId = cleanId(payload && payload.chapterId, 'chapterId');
  const chapter = await getChapterRecord(chapterId, false);
  const mode = payload && payload.mode === 'matching' ? 'matching' : '';
  if (!mode) fail('UNSUPPORTED_GAME_MODE');

  const totalQuestions = await getPairCount(chapterId);
  if (!totalQuestions) fail('CHAPTER_HAS_NO_ACTIVE_MATCHING_CONTENT');

  const created = await wixData.insert(C.attempts, {
    memberId,
    chapterId,
    contentVersion: chapter.contentVersion || 1,
    mode,
    startTime: new Date(),
    status: 'in_progress',
    totalQuestions,
    correctCount: 0,
    totalAttempts: 0,
    timeSpentMs: 0
  }, DATA_OPTIONS);

  const record = { ...created, attemptId: created._id };
  await wixData.update(C.attempts, record, DATA_OPTIONS);
  return { attemptId: created._id, chapterId, totalQuestions, status: 'in_progress' };
});

export const recordAnswer = webMethod(Permissions.SiteMember, async (payload) => {
  const memberId = await requireMemberId();
  const attemptId = cleanId(payload && payload.attemptId, 'attemptId');
  const chapterId = cleanId(payload && payload.chapterId, 'chapterId');
  const pairId = cleanId(payload && payload.pairId, 'pairId');
  const selectedItemId = cleanId(payload && payload.selectedItemId, 'selectedItemId');
  const timeSpentMs = safeNumber(payload && payload.timeSpentMs, 0, 600000);

  const attempt = await wixData.get(C.attempts, attemptId, DATA_OPTIONS);
  if (!attempt || attempt.memberId !== memberId) fail('ATTEMPT_NOT_FOUND');
  if (attempt.chapterId !== chapterId || attempt.mode !== 'matching') fail('ATTEMPT_CONTEXT_MISMATCH');
  if (attempt.status !== 'in_progress') fail('ATTEMPT_NOT_ACTIVE');
  await getChapterRecord(chapterId, false);

  const pair = await findOne(
    wixData.query(C.pairs)
      .eq('chapterId', chapterId)
      .eq('pairId', pairId)
      .eq('isActive', true)
  );
  if (!pair || !pair.itemId) fail('MATCHING_PAIR_NOT_FOUND');

  const correctTask = await findOne(
    wixData.query(C.tasks)
      .eq('chapterId', chapterId)
      .eq('isActive', true)
      .eq('itemId', pair.itemId)
  );
  if (!correctTask) fail('MATCHING_ANSWER_NOT_FOUND');

  const selectedTask = await findOne(
    wixData.query(C.tasks)
      .eq('chapterId', chapterId)
      .eq('isActive', true)
      .eq('itemId', selectedItemId)
  );
  if (!selectedTask) fail('SELECTED_ITEM_NOT_FOUND');

  const priorAnswers = await queryAll(
    wixData.query(C.answers)
      .eq('attemptId', attemptId)
      .eq('pairId', pairId)
      .ascending('attemptNum')
  );
  if (priorAnswers.some((answer) => answer.isCorrect === true || answer.isRevealed === true)) {
    fail('PAIR_ALREADY_RESOLVED');
  }

  const attemptNum = priorAnswers.length + 1;
  if (attemptNum > MAX_ANSWER_ATTEMPTS) fail('NO_ATTEMPTS_REMAINING');
  const isCorrect = selectedItemId === pair.itemId;
  const isRevealed = !isCorrect && attemptNum >= MAX_ANSWER_ATTEMPTS;
  const answerRecord = await wixData.insert(C.answers, {
    attemptId,
    memberId,
    chapterId,
    pairId,
    selectedItemId,
    attemptNum,
    isCorrect,
    isRevealed,
    timeSpentMs,
    timestamp: new Date()
  }, DATA_OPTIONS);
  await wixData.update(C.answers, { ...answerRecord, answerId: answerRecord._id }, DATA_OPTIONS);

  let progress = null;
  if (isCorrect || isRevealed) progress = await rebuildChapterProgress(memberId, chapterId);

  return {
    answerId: answerRecord._id,
    attemptNum,
    isCorrect,
    isRevealed,
    attemptsLeft: isCorrect || isRevealed ? 0 : Math.max(0, MAX_ANSWER_ATTEMPTS - attemptNum),
    feedbackCorrect: isCorrect ? (correctTask.feedbackCorrect || localized('', '')) : null,
    feedbackIncorrect: !isCorrect ? (correctTask.feedbackIncorrect || localized('', '')) : null,
    matchedItem: isCorrect || isRevealed ? safeMatchedItem(correctTask) : null,
    progress
  };
});

export const getChapterProgress = webMethod(Permissions.SiteMember, async ({ chapterId }) => {
  const memberId = await requireMemberId();
  const safeChapterId = cleanId(chapterId, 'chapterId');
  const record = await findOne(
    wixData.query(C.chapterProgress)
      .eq('memberId', memberId)
      .eq('chapterId', safeChapterId)
  );
  if (!record) {
    const totalQuestions = await getPairCount(safeChapterId);
    return {
      chapterId: safeChapterId,
      completedPairIds: [],
      completedCount: 0,
      totalQuestions,
      remaining: totalQuestions,
      progressPercent: 0,
      status: 'not_started'
    };
  }
  return {
    chapterId: safeChapterId,
    completedPairIds: Array.isArray(record.completedPairIds) ? record.completedPairIds : [],
    completedCount: record.completedCount || 0,
    totalQuestions: record.totalQuestions || 0,
    remaining: Math.max(0, (record.totalQuestions || 0) - (record.completedCount || 0)),
    progressPercent: record.progressPercent || 0,
    status: record.status || 'not_started'
  };
});

function summarizeAttempt(attempt, answers) {
  const correctCount = answers.filter((answer) => answer.isCorrect === true).length;
  const revealedCount = answers.filter((answer) => answer.isRevealed === true).length;
  const totalAttempts = answers.length;
  const firstTimeCorrect = answers.filter((answer) => answer.isCorrect === true && answer.attemptNum === 1).length;
  return {
    attemptId: attempt.attemptId || attempt._id,
    chapterId: attempt.chapterId,
    status: attempt.status,
    correctCount,
    revealedCount,
    totalAttempts,
    incorrectAttempts: Math.max(0, totalAttempts - correctCount),
    firstTimeCorrect,
    totalQuestions: attempt.totalQuestions || 0,
    timeSpentMs: attempt.timeSpentMs || 0,
    scorePercent: attempt.totalQuestions ? Math.round((correctCount / attempt.totalQuestions) * 100) : 0
  };
}

export const completeAttempt = webMethod(Permissions.SiteMember, async ({ attemptId }) => {
  const memberId = await requireMemberId();
  const safeAttemptId = cleanId(attemptId, 'attemptId');
  const attempt = await wixData.get(C.attempts, safeAttemptId, DATA_OPTIONS);
  if (!attempt || attempt.memberId !== memberId) fail('ATTEMPT_NOT_FOUND');

  const answers = await queryAll(
    wixData.query(C.answers).eq('attemptId', safeAttemptId)
  );
  if (attempt.status === 'completed') return summarizeAttempt(attempt, answers);
  if (attempt.status !== 'in_progress') fail('ATTEMPT_NOT_ACTIVE');

  const correctCount = answers.filter((answer) => answer.isCorrect === true).length;
  const totalAttempts = answers.length;
  const started = attempt.startTime instanceof Date ? attempt.startTime.getTime() : new Date(attempt.startTime).getTime();
  const timeSpentMs = Number.isFinite(started) ? Math.max(0, Date.now() - started) : 0;
  const completed = {
    ...attempt,
    endTime: new Date(),
    status: 'completed',
    correctCount,
    totalAttempts,
    timeSpentMs
  };
  await wixData.update(C.attempts, completed, DATA_OPTIONS);
  await updateMemberProgress(memberId, attempt.chapterId, timeSpentMs);
  return summarizeAttempt(completed, answers);
});

export const getMyProgress = webMethod(Permissions.SiteMember, async () => {
  const memberId = await requireMemberId();
  const record = await findOne(wixData.query(C.memberProgress).eq('memberId', memberId));
  return record ? {
    completedChapters: Array.isArray(record.completedChapters) ? record.completedChapters : [],
    completedChapterCount: record.completedChapterCount || 0,
    totalPlayTimeMs: record.totalPlayTimeMs || 0,
    lastActive: record.lastActive || null
  } : {
    completedChapters: [],
    completedChapterCount: 0,
    totalPlayTimeMs: 0,
    lastActive: null
  };
});

export const getMyGameHistory = webMethod(Permissions.SiteMember, async (payload = {}) => {
  const memberId = await requireMemberId();
  const requestedLimit = Number(payload.limit);
  const safeLimit = Math.max(1, Math.min(Number.isFinite(requestedLimit) ? Math.floor(requestedLimit) : 30, 50));
  const result = await wixData.query(C.attempts)
    .eq('memberId', memberId)
    .descending('startTime')
    .limit(safeLimit)
    .find(DATA_OPTIONS);
  return (result.items || []).map((row) => ({
    attemptId: row.attemptId || row._id,
    chapterId: row.chapterId,
    mode: row.mode,
    startTime: row.startTime || null,
    endTime: row.endTime || null,
    status: row.status,
    totalQuestions: row.totalQuestions || 0,
    correctCount: row.correctCount || 0,
    totalAttempts: row.totalAttempts || 0,
    timeSpentMs: row.timeSpentMs || 0
  }));
});
