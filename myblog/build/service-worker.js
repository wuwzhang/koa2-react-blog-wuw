"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","7410a410e60b098500dd213d2c57e2ee"],["/static/css/main.9e33b3fe.css","cc2d5e54874a67e8501e447aa238c55f"],["/static/js/0.13050332.chunk.js","d2128c63e77ce36d70694a984573000c"],["/static/js/1.0491fe8f.chunk.js","d99a0a52c54bca55218bd8237d4b4e33"],["/static/js/main.89171ab0.js","0c03869821a773e6245175460d681a9d"],["/static/media/1.bf344018.jpg","bf344018516b92830280bedccdb51eef"],["/static/media/2.59ec827b.jpg","59ec827bc523d89cde393ecc7ea484ca"],["/static/media/3.912c88b9.jpg","912c88b98dcef7d1a82c475d61b82c36"],["/static/media/4.4e008450.jpg","4e0084508d8954f82e0c65a8ee7cd314"],["/static/media/5.e0a1c346.jpg","e0a1c346ac4bdebde46f2987d642a25c"],["/static/media/about-1.7c3224a2.png","7c3224a282b6547d6050a6e13dd44f97"],["/static/media/about-2.df3d1122.png","df3d1122e892531c5b8d871088ee469b"],["/static/media/about-3.82a14fa6.png","82a14fa61a4576341ba8eb195724bcc8"],["/static/media/articleList.4c8164ab.png","4c8164ab82823f824eeda6853b0dd983"],["/static/media/avatar.7f9e9a58.jpg","7f9e9a58181dc2e8a2ac977869c26c6e"],["/static/media/cloudLabel.4914c745.png","4914c745cc18822ca4797d592e05996d"],["/static/media/foot.2a644e72.png","2a644e72f587b8c87fcbecbb7f618843"],["/static/media/keepOnFile-bg.e527aa11.png","e527aa11377db058615d638fd4df77e0"],["/static/media/login-bg.4a95a9d1.png","4a95a9d191096c9484d638b96bfe5945"],["/static/media/regist-bg.a9eb227a.png","a9eb227abbb1fd4239858becae3d77ce"],["/static/media/searchArticle.62477929.png","624779291737a911e3ce55569207a91f"],["/static/media/searchByCatalog.6ed8d64b.png","6ed8d64b31a10cef327982874b8bf98a"],["/static/media/searchByTag.676a7215.png","676a7215e62f4d4c3a72b151f50a970a"],["/static/media/wechat.6ac58210.jpg","6ac58210f588ad4a41a7216373bdaad1"],["/static/media/wordcloud-background.310b0152.png","310b0152a9cd229a6f5524edfdcdc682"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});