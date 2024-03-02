// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBizrRufoBRyyS-5J-ex89mvCRmFwmOWIM",
  authDomain: "react-cursos-2436c.firebaseapp.com",
  projectId: "react-cursos-2436c",
  storageBucket: "react-cursos-2436c.appspot.com",
  messagingSenderId: "246287746720",
  appId: "1:246287746720:web:13e046ea8833418756abc5",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
