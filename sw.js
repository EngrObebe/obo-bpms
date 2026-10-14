/* OBO-BPMS service worker: works offline and tells the page when a new version is published */
const CACHE="obo-bpms";
const CORE=["./","manifest.webmanifest","icon-192.png","icon-512.png","vendor/firebase-app-compat.js","vendor/firebase-auth-compat.js","vendor/firebase-firestore-compat.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  const page=r.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname);const key=page?"./":r;
  e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(key);
    const net=fetch(r,{cache:"no-cache"}).then(async res=>{if(res&&res.ok){const old=hit&&(hit.headers.get("etag")||hit.headers.get("last-modified"));const now=res.headers.get("etag")||res.headers.get("last-modified");
        await c.put(key,res.clone());if(page&&hit&&old&&now&&old!==now){(await self.clients.matchAll({type:"window"})).forEach(w=>w.postMessage({type:"update"}))}}return res}).catch(()=>hit);
    return hit||net}))});
