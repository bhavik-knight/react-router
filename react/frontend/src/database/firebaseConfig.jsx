// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import the firestore object from the module
import { getFireStore } from "@firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// instantiate the firestore object within our app
const fireStore = getFireStore(app)

export { fireStore }
