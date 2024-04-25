import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDD-8EsPr2HOhVJshGw8rXWBKiuPa508Ms",
    authDomain: "project6-wap.firebaseapp.com",
    projectId: "project6-wap",
    storageBucket: "project6-wap.appspot.com",
    messagingSenderId: "291600905610",
    appId: "1:291600905610:web:580dcc8b5af54dcce78473"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
