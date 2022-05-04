// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByJ2DTipMFTshKNQIWLzT06Np386FuNeo",
    authDomain: "ogrenciden-1903.firebaseapp.com",
    projectId: "ogrenciden-1903",
    storageBucket: "ogrenciden-1903.appspot.com",
    messagingSenderId: "976272317973",
    appId: "1:976272317973:web:9061a5d9a246e9c767f81c",
    measurementId: "G-YGMZZ050XH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);