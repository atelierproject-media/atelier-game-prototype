(() => {
  'use strict';
  const embedded = (() => { try { return window.parent !== window; } catch (_) { return false; } })();
  const pending = new Map();
  let sequence = 0;

  window.addEventListener('message', (event) => {
    if (!embedded || event.source !== window.parent) return;
    const message = event.data;
    if (!message || message.channel !== 'ATELIER_WIX' || message.kind !== 'response' || !message.requestId) return;
    const request = pending.get(message.requestId);
    if (!request) return;
    clearTimeout(request.timer);
    pending.delete(message.requestId);
    if (message.ok) request.resolve(message.data);
    else request.reject(new Error(message.error || 'WIX_BACKEND_ERROR'));
  });

  function request(method, payload = {}, timeoutMs = 20000) {
    if (!embedded) return Promise.reject(new Error('WIX_BRIDGE_NOT_AVAILABLE'));
    return new Promise((resolve, reject) => {
      const requestId = 'atelier_' + Date.now() + '_' + (++sequence);
      const timer = setTimeout(() => {
        pending.delete(requestId);
        reject(new Error('WIX_BRIDGE_TIMEOUT:' + method));
      }, timeoutMs);
      pending.set(requestId, { resolve, reject, timer });
      try {
        window.parent.postMessage({
          channel: 'ATELIER_WIX',
          kind: 'request',
          requestId,
          method,
          payload
        }, '*');
      } catch (error) {
        clearTimeout(timer);
        pending.delete(requestId);
        reject(error);
      }
    });
  }

  window.AtelierWixBridge = Object.freeze({ embedded, request });
})();
