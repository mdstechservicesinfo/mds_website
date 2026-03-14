import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBxpFtHU-d4OLr4N-ewXicRPVDXRRYC4aY",
  authDomain: "mdstechservices-ph.firebaseapp.com",
  projectId: "mdstechservices-ph",
  storageBucket: "mdstechservices-ph.firebasestorage.app",
  messagingSenderId: "821432444079",
  appId: "1:821432444079:web:9461dc6e4789522d50205a",
  measurementId: "G-NMGGX0HYY5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);