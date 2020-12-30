const CACHE_NAME = "static-cache";
const FILES_TO_CACHE = [
  "/",
  "offline",
  "/static/prod/css/template.css",
  "/static/prod/js/service-worker.js",
  "/static/site.webmanifest",
  "/static/images/favicon/android-chrome-192x192.png",
  "/static/images/favicon/android-chrome-512x512.png",
  "/static/images/favicon/apple-touch-icon.png",
  "/static/images/favicon/favicon.ico",
  "/static/images/favicon/favicon-16x16.png",
  "/static/images/favicon/favicon-32x32.png",
  "/static/images/favicon/maskable_icon.png",
];

// INSTALLATION
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// ACTIVATION
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (evt) => {
  if (evt.request.mode !== "navigate") {
    return;
  }

  evt.respondWith(
    fetch(evt.request).catch(async function () {
      const cache = await caches.open(CACHE_NAME);
      return await cache.match("offline");
    })
  );
});
