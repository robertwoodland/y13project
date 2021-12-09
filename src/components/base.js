 import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDcjFqBEiN6xTa0mYdjOkifoqh24NuPDKI",
    authDomain: "y13project-9c2a6.firebaseapp.com",
    projectId: "y13project-9c2a6",
    storageBucket: "y13project-9c2a6.appspot.com",
    messagingSenderId: "319905312780",
    appId: "1:319905312780:web:9f39b9214e19bcde0abe29",
    measurementId: "${config.measurementId}"
});

export default app