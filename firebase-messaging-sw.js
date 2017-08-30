// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyC5VDrJ2n8qlasT3DaWdsiW289RjNWor-A",
  authDomain: "storesense-1a3d1.firebaseapp.com",
  databaseURL: "https://storesense-1a3d1.firebaseio.com",
  projectId: "storesense-1a3d1",
  storageBucket: "storesense-1a3d1.appspot.com",
  messagingSenderId: "956077735708"
};
firebase.initializeApp(config);

const messaging = firebase.messaging()

// messaging.setBackgroundMessageHandler((payload) => {
//   const title = "Hello World"
//   const options = {
//     body: payload.data.status
//   }
//   return self.registration.showNotification(title, options)
// })
