// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js'
import {getDatabase, ref, set, child, get, remove } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB73SgEdmEIXAUw_Is0_dk0nLJx2CqV6S4",
  authDomain: "birthday-bb3b7.firebaseapp.com",
  databaseURL: "https://birthday-bb3b7-default-rtdb.firebaseio.com/",
  projectId: "birthday-bb3b7",
  storageBucket: "birthday-bb3b7.appspot.com",
  messagingSenderId: "824880468107",
  appId: "1:824880468107:web:b91969b5d4663b47fac48e",
  measurementId: "G-4F0N3ZNV1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app)

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
        db, ref, set, child, get, remove}