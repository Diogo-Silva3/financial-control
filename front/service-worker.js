// Service Worker para PWA
const CACHE_NAME = 'controle-financeiro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/principal.html',
  '/sobre.html',
  '/usuario.html',
  '/assets/css/style.css',
  '/assets/css/animations.css',
  '/assets/css/dark-mode.css',
  '/assets/js/scripts.js',
  '/assets/js/melhorias.js',
  '/assets/js/dashboard.js'
];

// Instalação
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
