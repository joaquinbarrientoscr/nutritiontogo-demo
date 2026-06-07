const CACHE = 'ntg-staging-v1';
const ASSETS = [
  '/nutritiontogo-demo/cotizador-staging.html',
  '/nutritiontogo-demo/manifest-staging.json',
  '/nutritiontogo-demo/ntg-logo.png',
  '/nutritiontogo-demo/favicon.svg',
  '/nutritiontogo-demo/pwa-icon.svg',
  '/nutritiontogo-demo/ntg-bg.png',
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
