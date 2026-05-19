import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAmV5vLZdvYg7-nKS2UNpxqhHLtjCx62A4",
    authDomain: "clixora-98533.firebaseapp.com",
    projectId: "clixora-98533",
    storageBucket: "clixora-98533.firebasestorage.app",
    messagingSenderId: "189538563366",
    appId: "1:189538563366:web:1a30358cd631905f70fde7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();





// apiKey-Tera Firebase project identify karta hai
//authDomain-Google login ka domain — yahan redirect hoga
//projectid- Firebase project ka unique identifier
//storageBucket- Firebase storage ka URL, jahan files store hoti hain
//messagingSenderId- Firebase Cloud Messaging ke liye unique ID
//appId- Firebase app ka unique identifier