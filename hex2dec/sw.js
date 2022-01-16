var staticCacheName = "pwa";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([ 
        "./static/css/main.3893eef2.chunk.css",
        "./static/css/main.3893eef2.chunk.css.map",
        "./static/js/main.1c6f7f5b.chunk.js",
        "./static/js/runtime-main.d9fea5d6.js",
        "./static/js/runtime-main.d9fea5d6.js.map",
        "./static/js/main.1c6f7f5b.chunk.js.map",
        "./static/js/2.666a38db.chunk.js",
        "./static/js/2.666a38db.chunk.js.map",
        "./static/js/2.666a38db.chunk.js.LICENSE.txt",
        "./manifest.json",
        "./images/android-chrome-192x192.png",
        "./images/android-chrome-512x512.png",
        "./images/android-chrome-full.png",
        "https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@400;500;700&display=swap",
        "https://fonts.gstatic.com/s/redhatmono/v5/jVyN7nDnA2uf2zVvFAhhzEsUWOxS.woff2",
        "./",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        return resp;
      }
    })
  );
});
