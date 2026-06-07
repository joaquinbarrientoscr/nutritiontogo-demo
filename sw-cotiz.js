const CACHE = 'ntg-cotiz-v7';
const ASSETS = [
  '/nutritiontogo-demo/cotizador.html',
  '/nutritiontogo-demo/manifest-cotiz.json',
  '/nutritiontogo-demo/ntg-logo2-dark.svg',
  '/nutritiontogo-demo/ntg-logo-dark.svg',
  '/nutritiontogo-demo/ntg-wordmark-light.svg',
  '/nutritiontogo-demo/favicon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
