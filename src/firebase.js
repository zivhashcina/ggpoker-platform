// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgld99YxEVjXFqB0tbVOMX3molAF70tZ4",
  authDomain: "ggpoker-platform.firebaseapp.com",
  projectId: "ggpoker-platform",
  storageBucket: "ggpoker-platform.firebasestorage.app",
  messagingSenderId: "677752727591",
  appId: "1:677752727591:web:8ac0054165c90805c84602"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
};
