var staticCacheName = "pwa";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([ 
        "./static/css/main.92d7c84c.chunk.css",
        "./static/css/main.92d7c84c.chunk.css.map",
        "./static/js/main.770fd736.chunk.js",
        "./static/js/main.770fd736.chunk.js.map",
        "./static/js/runtime-main.f496e3e0.js",
        "./static/js/runtime-main.f496e3e0.js.map",
        "./static/js/2.4f2d7ce1.chunk.js",
        "./static/js/2.4f2d7ce1.chunk.js.map",
        "./static/js/2.4f2d7ce1.chunk.js.LICENSE.txt",
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
