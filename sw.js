/* Cirri service worker.
   Purpose: make Cirri installable, and nothing else. It does NOT cache the app or any
   data: every load fetches index.html from the network so a push reaches everyone and
   nothing sensitive is stored on disk. When there is no connection it shows a short
   page saying so, rather than a stale copy of the tool. */
const OFFLINE_HTML = `<!doctype html><meta charset="utf-8"><title>Cirri</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f4f8fa;color:#03243c;display:flex;align-items:center;justify-content:center;height:100vh}
.c{text-align:center;max-width:360px;padding:24px}h1{font-size:20px;margin:0 0 8px}p{color:#5f7a8c;font-size:14px;line-height:1.5;margin:0 0 16px}
button{border:1px solid #c6e4e2;background:#fff;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}</style>
<div class="c"><h1>Cirri needs a connection</h1><p>The live record of the company is not stored on this computer. Reconnect and try again.</p><button onclick="location.reload()">Try again</button></div>`;
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;               // only the document; everything else is untouched
  e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
