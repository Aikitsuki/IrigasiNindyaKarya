const C='irigasi-v4';
const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
const CDN='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(F);await c.add(CDN).catch(()=>{})}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||u.hostname==='cdn.jsdelivr.net')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match('./index.html'))))});
