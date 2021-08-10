const cacheName = "version1";
const urlToCache = ['index.html', 'offline.html'] //when offline


const self = this;//SW
//install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('open cache');

                return cache.addAll(urlToCache)
            })
    )
})
//listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => { console.log('offline'); caches.match('offline.html') })
            })
    )
})
//activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(cacheName);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        )

        )
    )
})