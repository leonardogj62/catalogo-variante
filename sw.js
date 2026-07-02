// Service Worker — Catálogo por Variante
// Caches all app assets on first visit so the app works offline after that.
// Version bump (change CACHE_NAME) to force a cache refresh when you deploy updates.

const CACHE_NAME = 'catalogo-v2';

// Assets to pre-cache on install. The CDN libs are large so we cache them
// on first fetch (not pre-cache) to keep the install fast.
const PRE_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// CDN domains whose responses we cache on first use (cache-first strategy)
const CDN_HOSTS = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRE_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For CDN resources: cache-first (serve from cache if available, else fetch and cache)
  if(CDN_HOSTS.includes(url.hostname)){
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(response => {
          if(response.ok){
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // For app files: cache-first with network fallback
  if(url.origin === self.location.origin){
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Everything else (Tesseract trained data downloads, etc.): network-first
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
