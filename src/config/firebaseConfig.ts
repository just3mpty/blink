import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCS9Mp_g1pWNGsGeMXf2t1jLpOPLtflrCk",
    authDomain: "blink-65130.firebaseapp.com",
    projectId: "blink-65130",
    storageBucket: "blink-65130.appspot.com",
    messagingSenderId: "840679145518",
    appId: "1:840679145518:web:e239937b8b4f9dd5d89fbf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
