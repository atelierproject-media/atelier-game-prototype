/**
 * Wix Editor Page Code for the Practice page.
 * The HTML Component ID was established in the project conversation as #html2.
 * Merge this handler into existing Practice page code; do not replace unrelated handlers.
 */
import {
  getChapterBundle,
  getChapterBundleForAdmin,
  startAttempt,
  recordAnswer,
  getChapterProgress,
  completeAttempt,
  getMyProgress,
  getMyGameHistory
} from 'backend/gameBackend.web';

$w.onReady(() => {
  const gameFrame = $w('#html2');

  gameFrame.onMessage(async (event) => {
    const message = event.data;
    if (!message || message.channel !== 'ATELIER_WIX' || message.kind !== 'request') return;
    if (typeof message.requestId !== 'string' || message.requestId.length > 160) return;

    let data;
    try {
      const payload = message.payload && typeof message.payload === 'object' ? message.payload : {};
      switch (message.method) {
        case 'getChapterBundle':
          data = await getChapterBundle({ chapterId: payload.chapterId });
          break;
        case 'getChapterBundleForAdmin':
          data = await getChapterBundleForAdmin({ chapterId: payload.chapterId });
          break;
        case 'startAttempt':
          data = await startAttempt({
            chapterId: payload.chapterId,
            mode: payload.mode
          });
          break;
        case 'recordAnswer':
          // Do not pass memberId, attemptNum, isCorrect, isRevealed, or answer keys.
          data = await recordAnswer({
            attemptId: payload.attemptId,
            chapterId: payload.chapterId,
            pairId: payload.pairId,
            selectedItemId: payload.selectedItemId,
            timeSpentMs: payload.timeSpentMs
          });
          break;
        case 'getChapterProgress':
          data = await getChapterProgress({ chapterId: payload.chapterId });
          break;
        case 'completeAttempt':
          data = await completeAttempt({ attemptId: payload.attemptId });
          break;
        case 'getMyProgress':
          data = await getMyProgress();
          break;
        case 'getMyGameHistory':
          data = await getMyGameHistory({ limit: payload.limit });
          break;
        default:
          throw new Error('UNKNOWN_GAME_METHOD');
      }

      gameFrame.postMessage({
        channel: 'ATELIER_WIX',
        kind: 'response',
        requestId: message.requestId,
        ok: true,
        data
      });
    } catch (error) {
      gameFrame.postMessage({
        channel: 'ATELIER_WIX',
        kind: 'response',
        requestId: message.requestId,
        ok: false,
        error: error && error.message ? error.message : 'WIX_BACKEND_ERROR'
      });
    }
  });
});
