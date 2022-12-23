// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBztf5dUsOAtaLRhlMGl3mBb1nrVITlLgE",
  authDomain: "react-todo-2595f.firebaseapp.com",
  projectId: "react-todo-2595f",
  storageBucket: "react-todo-2595f.appspot.com",
  messagingSenderId: "276053614326",
  appId: "1:276053614326:web:7c4440e75806af1f9656d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)