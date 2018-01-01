"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","4410490528cbe005ad1fe1fda4673368"],["/static/css/main.f225b78f.css","3651a707917e34972e24bfbc9046ee4b"],["/static/js/0.bb125d3c.chunk.js","ab0e12d6cc9108dd37eb5bae6bf207a7"],["/static/js/1.0491fe8f.chunk.js","d99a0a52c54bca55218bd8237d4b4e33"],["/static/js/main.e9ccb8b9.js","90891fe14c235fd109bb63ea74d55978"],["/static/media/1.c62a6b24.jpg","c62a6b2453d6a305611daeacbe806aba"],["/static/media/2.17703b17.jpg","17703b17f1b488ccbbb9422d72b7074d"],["/static/media/3.48bdaf7c.jpg","48bdaf7c6025e818dbee0f512e0f865d"],["/static/media/4.4e008450.jpg","4e0084508d8954f82e0c65a8ee7cd314"],["/static/media/5.f12ac93e.jpg","f12ac93e073aff7d1257b72b8ac93531"],["/static/media/about-1.7c3224a2.png","7c3224a282b6547d6050a6e13dd44f97"],["/static/media/about-2.df3d1122.png","df3d1122e892531c5b8d871088ee469b"],["/static/media/about-3.82a14fa6.png","82a14fa61a4576341ba8eb195724bcc8"],["/static/media/articleList.2cd71af7.png","2cd71af77e24d1692030bf2f300fbeb3"],["/static/media/avatar.7f9e9a58.jpg","7f9e9a58181dc2e8a2ac977869c26c6e"],["/static/media/cloudLabel.987d35af.png","987d35afbb8e0fd362d00f9a6131aaa9"],["/static/media/foot.2a644e72.png","2a644e72f587b8c87fcbecbb7f618843"],["/static/media/keepOnFile-bg.9fa1efae.png","9fa1efaeaf86e7529a8251b7c3e56a5a"],["/static/media/login-bg.b187d497.png","b187d4970d20ff24d7e93ff252718952"],["/static/media/regist-bg.e720171c.png","e720171cc648108cd47690f0080d73cc"],["/static/media/searchArticle.c8477e83.png","c8477e83c643dd98a88b276b0a254a3c"],["/static/media/searchByCatalog.fc0b7618.png","fc0b761871b1eea157d7e9dc2075eff4"],["/static/media/searchByTag.ce426126.png","ce4261262549cd57fd3e84f21c750331"],["/static/media/wechat.6ac58210.jpg","6ac58210f588ad4a41a7216373bdaad1"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});