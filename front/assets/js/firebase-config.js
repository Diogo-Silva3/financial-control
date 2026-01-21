// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2xLKYgZXu0bjVpZwr4p7YvIhVdQkMVLs",
  authDomain: "financial-control1.firebaseapp.com",
  projectId: "financial-control1",
  storageBucket: "financial-control1.firebasestorage.app",
  messagingSenderId: "316674158632",
  appId: "1:316674158632:web:b4ac12b072cd428e32851d",
  measurementId: "G-4GHT48RQR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, storage, auth };
