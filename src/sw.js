const CACHE_NAME = 'hometown-brew-v1';
const urlsToCache = [
  './',
  './index.html',
  './src/index.css',
  './hblogo.jpg',
  './manifest.json',
  './wallpaper.jpg',
  // Add more static assets
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
