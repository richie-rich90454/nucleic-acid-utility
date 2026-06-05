let CACHE_NAME="nucleic-acid-utility-v1.2.0";
let ASSETS=[
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/favicon.png",
    "/og-image.png",
    "/robots.txt",
    "/sitemap.xml"
];
self.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=> cache.addAll(ASSETS))
    );
    self.skipWaiting();
});
self.addEventListener("activate", (event)=>{
    event.waitUntil(
        caches.keys().then((keys)=>
            Promise.all(keys.filter((key)=> key!==CACHE_NAME).map((key)=> caches.delete(key)))
        )
    );
    self.clients.claim();
});
self.addEventListener("fetch", (event)=>{
    event.respondWith(
        caches.match(event.request).then((cached)=>{
            if (cached) return cached;
            return fetch(event.request).then((response)=>{
                if (!response||response.status!==200||response.type!=="basic"){
                    return response;
                }
                let responseClone=response.clone();
                caches.open(CACHE_NAME).then((cache)=> cache.put(event.request, responseClone));
                return response;
            });
        })
    );
});
