// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhsmZHKvpmVC-M_VvAglVTjQxEAwMMxq4",
  authDomain: "project-1-5d683.firebaseapp.com",
  projectId: "project-1-5d683",
  storageBucket: "project-1-5d683.firebasestorage.app",
  messagingSenderId: "362107423414",
  appId: "1:362107423414:web:0d423f339b5d8d42f57417",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
