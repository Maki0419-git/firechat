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

})
//activate the SW
self.addEventListener('activate', (event) => {

})