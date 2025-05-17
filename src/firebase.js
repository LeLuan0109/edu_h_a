import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';  // thêm import Firestore

const firebaseConfig = {
    apiKey: 'AIzaSyDf_2wkwOFa7iTSzZaWTv5vTgCcvRP2_B0',
    authDomain: 'hong-anh-e56b9.firebaseapp.com',
    projectId: 'hong-anh-e56b9',
    storageBucket: 'hong-anh-e56b9.firebasestorage.app',
    messagingSenderId: '395739652870',
    appId: '1:395739652870:web:cc8d3a1b0a5c180b453487',
    measurementId: 'G-THB12LTZ8G'
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);  // Khởi tạo Firestore instance

export { app, analytics, firestore };
console.log('Firebase initialized');
