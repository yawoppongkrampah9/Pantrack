// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}  from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries\
 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxhQVDUz3daP6tZ5bdBbwGVewv-S-fWmQ",
  authDomain: "inventory-managment-eea5b.firebaseapp.com",
  projectId: "inventory-managment-eea5b",
  storageBucket: "inventory-managment-eea5b.appspot.com",
  messagingSenderId: "512439065022",
  appId: "1:512439065022:web:b9d60ae8ffc8d18ceb81ef",
  measurementId: "G-19J0S9T4DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}
