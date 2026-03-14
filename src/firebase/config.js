import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiT4PDGZpmxv84ps5QlhO8u4JPj4OqtV0",
  authDomain: "mds-profile-website.firebaseapp.com",
  projectId: "mds-profile-website",
  storageBucket: "mds-profile-website.firebasestorage.app",
  messagingSenderId: "770352959790",
  appId: "1:770352959790:web:6d09c8e52bb3089d37eabf",
  measurementId: "G-8H897P4600"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);