importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: './index.html', revision: '1' },
  { url: './nav.html', revision: '1' },
  { url: './css/materialize.min.css', revision: '1' },
  { url: './js/materialize.min.js', revision: '1' },
  { url: './js/nav.js', revision: '1' },
  { url: './js/jquery-3.4.1.js', revision: '1' },
  { url: './js/jquery-3.4.1.min.js', revision: '1' },
  { url: './js/require-2.3.6.js', revision: '1' },
  { url: './js/registerSW.js', revision: '1' },
  { url: './manifest.json', revision: '1' },
  { url: './action.js', revision: '1' },
  { url: './js/idb.js', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('/assets/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'assets'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-footbal',
  })
);

self.addEventListener('push', function(event) {
  console.log(event.data.text());
  /**
    Assuming the payload string is a valid JSON and can be parsed and contains a minimum of valid
    fields... possible fields can be:
    title: String,
    body: String,
    icon: String,
    badge: String,
    image: String,
    vibrate: Array,
    sound: String,
    dir: String,
    tag: String,
    requireInteraction: Boolean,
    renotify: Boolean,
    silent: Boolean,
    timestamp: Date
  */
  const title = 'Info Bola EPL';
  const options = {
    body: event.data.text(),
    icon: 'assets/icon-72x72.png',
  };

  event.waitUntil(self.registration.showNotification(title, options))
});