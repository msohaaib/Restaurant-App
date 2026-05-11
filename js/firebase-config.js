// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

// Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCPWqrE2hULuwFD5Celu6iXu-kor_RGXw8",
  authDomain: "restaurant-app-5447d.firebaseapp.com",
  projectId: "restaurant-app-5447d",
  storageBucket: "restaurant-app-5447d.firebasestorage.app",
  messagingSenderId: "718354742622",
  appId: "1:718354742622:web:3b1a650e3c472115bde3cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);
