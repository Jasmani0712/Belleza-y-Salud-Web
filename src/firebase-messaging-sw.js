/*export const environment = {
    firebase: {
      projectId: 'bellezaysalud1-71563',
      appId: '1:325514468766:web:c4529203c4c527e4f20a8f',
      databaseURL: 'https://bellezaysalud1-71563-default-rtdb.firebaseio.com',
      storageBucket: 'bellezaysalud1-71563.appspot.com',
      locationId: 'us-central',
      apiKey: 'AIzaSyBBsyahbuvZUcVuOew9TiwqyVqYnUpikuo',
      authDomain: 'bellezaysalud1-71563.firebaseapp.com',
      messagingSenderId: '325514468766',
      measurementId: 'G-0Y0647JXYL',
    },};*/



// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: 'AIzaSyBBsyahbuvZUcVuOew9TiwqyVqYnUpikuo',
    authDomain: 'bellezaysalud1-71563.firebaseapp.com',
    databaseURL: 'https://bellezaysalud1-71563-default-rtdb.firebaseio.com',
    projectId: 'bellezaysalud1-71563',
    storageBucket: 'bellezaysalud1-71563.appspot.com',
    messagingSenderId: '325514468766'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

