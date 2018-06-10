const staticCache = 'v1';

self.addEventListener('install', function (event) {
  // Cache resources required to show index.html
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      console.log("[serviceWorker] Cache static assets and JS");
      return cache.addAll([
        '/',
        '/index.html',
        '/css/grid.css',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js'
      ]);
    }).catch(function (err) {
      console.log("[serviceWorker] There was an error caching", err);
    })
  );
})

// Boilerplate from: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(staticCache).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          // cache if not google maps data
          if (event.request.url.indexOf('maps') < 0) {
            console.log("add fetched data to cache: ", event.request.url);
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log("[serviceWorker] Activated");
});