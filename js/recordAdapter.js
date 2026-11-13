class RecordAdapter {
    constructor() {
        this.storageKey = 'lse320_records_v3';
    }

    _emptyDB() {
        return { game_attempts: [], answer_records: [], game_events: [], member_progress: [], chapter_question_progress: [] };
    }

    initStorage() {
        const db = this._getDB();
        this._saveDB(db);
    }

    _getDB() {
        let db;
        try {
            db = JSON.parse(localStorage.getItem(this.storageKey) || 'null');
        } catch (e) {
            db = null;
        }
        if (!db || typeof db !== 'object') db = this._emptyDB();
        for (const key of Object.keys(this._emptyDB())) {
            if (!Array.isArray(db[key])) db[key] = [];
        }
        return db;
    }

    _saveDB(db) { localStorage.setItem(this.storageKey, JSON.stringify(db)); }
    _genId(prefix) { return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5); }

    startAttempt(playerId, chapterId, contentVersion) {
        const db = this._getDB();
        const att = { id: this._genId('att'), playerId, chapterId, contentVersion, startTime: new Date().toISOString(), status: 'in_progress' };
        db.game_attempts.push(att);
        this._saveDB(db);
        this.recordEvent(att.id, 'ATTEMPT_STARTED');
        return att.id;
    }

    recordAnswer(attemptId, pairId, selectedToolId, isCorrect, attemptNum, timeSpentMs, isRevealed) {
        const db = this._getDB();
        const existing = db.answer_records.find(a => a.attemptId === attemptId && a.pairId === pairId && a.attemptNum === attemptNum);
        if (existing) return existing;
        const ans = { id: this._genId('ans'), attemptId, pairId, selectedToolId, isCorrect, attemptNum, timeSpentMs, isRevealed, timestamp: new Date().toISOString() };
        db.answer_records.push(ans);
        this._saveDB(db);
        this.recordEvent(attemptId, 'ANSWER_SUBMITTED', { pairId, isCorrect, attemptNum });
        return ans;
    }

    resolveQuestion(playerId, chapterId, pairId, totalQuestions) {
        const db = this._getDB();
        let progress = db.chapter_question_progress.find(p => p.playerId === playerId && p.chapterId === chapterId);
        if (!progress) {
            progress = { playerId, chapterId, completedPairIds: [], totalQuestions, status: 'in_progress', lastUpdated: new Date().toISOString() };
            db.chapter_question_progress.push(progress);
        }
        if (!progress.completedPairIds.includes(pairId)) progress.completedPairIds.push(pairId);
        progress.totalQuestions = totalQuestions;
        progress.completedCount = progress.completedPairIds.length;
        progress.progressPercent = totalQuestions ? Math.round(progress.completedCount / totalQuestions * 100) : 0;
        progress.status = progress.completedCount >= totalQuestions ? 'completed' : 'in_progress';
        progress.lastUpdated = new Date().toISOString();

        let member = db.member_progress.find(p => p.playerId === playerId);
        if (!member) {
            member = { playerId, completedChapters: [], totalPlayTimeMs: 0, lastActive: new Date().toISOString() };
            db.member_progress.push(member);
        }
        if (progress.status === 'completed' && !member.completedChapters.includes(chapterId)) member.completedChapters.push(chapterId);
        member.lastActive = new Date().toISOString();
        this._saveDB(db);
        return progress;
    }

    getChapterProgress(playerId, chapterId, allPairIds = []) {
        const db = this._getDB();
        const progress = db.chapter_question_progress.find(p => p.playerId === playerId && p.chapterId === chapterId);
        const saved = progress?.completedPairIds || [];
        const completedPairIds = saved.filter(id => allPairIds.length === 0 || allPairIds.includes(id));
        const total = allPairIds.length || progress?.totalQuestions || 0;
        const completed = completedPairIds.length;
        return {
            playerId, chapterId, completedPairIds, completedCount: completed, totalQuestions: total,
            remaining: Math.max(0, total - completed),
            progressPercent: total ? Math.round(completed / total * 100) : 0,
            status: total > 0 && completed >= total ? 'completed' : completed ? 'in_progress' : 'not_started'
        };
    }

    recordEvent(attemptId, eventType, data = null) {
        const db = this._getDB();
        db.game_events.push({ id: this._genId('evt'), attemptId, eventType, data, timestamp: new Date().toISOString() });
        this._saveDB(db);
    }

    completeAttempt(attemptId, stats) {
        const db = this._getDB();
        const att = db.game_attempts.find(a => a.id === attemptId);
        if (att && att.status !== 'completed') {
            att.status = 'completed';
            att.endTime = new Date().toISOString();
            att.stats = stats;
            this._saveDB(db);
            this.recordEvent(attemptId, 'ATTEMPT_COMPLETED', stats);
        }
    }

    getAttemptHistory(playerId) {
        const db = this._getDB();
        return db.game_attempts.filter(a => a.playerId === playerId);
    }
}
const recordAdapter = new RecordAdapter();
