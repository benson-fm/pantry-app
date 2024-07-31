// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl9G4IGGY3qRZ4j6ry4Afpaol1lKp9B50",
  authDomain: "hspantryapp-5323f.firebaseapp.com",
  projectId: "hspantryapp-5323f",
  storageBucket: "hspantryapp-5323f.appspot.com",
  messagingSenderId: "999848177374",
  appId: "1:999848177374:web:51b1409e03d5967851dc4f",
  measurementId: "G-ZWLVYN1YN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export {app, firestore}