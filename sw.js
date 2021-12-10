const VERSION = 'v1';

self.addEventListener('install', (event) => {
  // Espera hasta que el precaché se complete
  event.waitUntil(precache());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  // get - solo trabajaremos con los get

  // Si el método REQUEST no es igual a GET sigue por el proceso normal
  if (request.method !== 'GET') {
    return;
  }

  //buscar en caché
  event.respondWith(cachedResponse(request));

  //actualizar el cache
  event.waitUntil(updatedCache(request));
});

async function precache() {
  const cache = await caches.open(VERSION);
  return cache.addAll([
    '/',
    '/index.html',
    '/assets/index.js',
    '/assets/MediaPlayer.js',
    '/assets/plugins/AutoPlay.js',
    '/assets/plugins/AutoPause.js',
    '/assets/index.css',
    '/assets/BigBuckBunny.mp4',
  ]);
}

async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request);
  // En el caso no exista cache retornar lo que se encuentre en RED
  return response || fetch(request);
}

async function updatedCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}
