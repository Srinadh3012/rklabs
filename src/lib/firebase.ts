import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAE5o4rjL_Fc8qNM7g3tEYZAZpF_6m8mro",
  authDomain: "rklabs-bb014.firebaseapp.com",
  projectId: "rklabs-bb014",
  storageBucket: "rklabs-bb014.firebasestorage.app",
  messagingSenderId: "827248140767",
  appId: "1:827248140767:web:5aa15104a74cfa8113a46a",
  measurementId: "G-GZZE8FVD1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
