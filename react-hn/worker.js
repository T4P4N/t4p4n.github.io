var staticCacheName = "react-hn-pwa";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        "./static/js/2.9d05bfa1.chunk.js",
        "./static/js/2.9d05bfa1.chunk.js.map",
        "./static/js/2.9d05bfa1.chunk.LICENSE.txt",
        "./static/js/main.40f26bdb.chunk.js",
        "./static/js/main.40f26bdb.chunk.js.map",
        "./static/css/main.35e572dd.chunk.css",
        "./static/css/main.35e572dd.chunk.css.map",
        "./static/js/runtime-main.6075419b.js",
        "./static/js/runtime-main.6075419b.js.map",
        "./manifest.json",
        "./images/android-chrome-192x192.png",
        "./images/android-chrome-512x512.png",
        "./images/android-chrome-full.png",
        "./images/favicon.png",
        "./images/favicon.svg",
        "https://hn.algolia.com/api/v1//search?query=&page=0",
        "https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;800&display=swap",
        "https://fonts.gstatic.com/s/exo2/v15/7cHmv4okm5zmbtYoK-4.woff2",
        "./",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      })
    );
  }
});
