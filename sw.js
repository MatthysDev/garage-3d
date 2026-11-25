// réseau d'abord, copie locale si pas de réseau (garage, parking)
self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();e.waitUntil(caches.open('garage').then(k=>k.put(r,c)))}return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||Response.error())))});
