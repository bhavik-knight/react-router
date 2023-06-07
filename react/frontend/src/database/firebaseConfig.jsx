// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import the firestore object from the module
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.FIREBASE_API_KEY,
//     authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.FIREBASE_APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyCDaWY8_oXp4sYh9Epco9F2xhTxoR4YMZ4",
    authDomain: "portfolio-database-9feb8.firebaseapp.com",
    projectId: "portfolio-database-9feb8",
    storageBucket: "portfolio-database-9feb8.appspot.com",
    messagingSenderId: "856075319505",
    appId: "1:856075319505:web:0832092c2939f874132df0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// instantiate the firestore service within our app
const db = getFirestore(app)

// instantiate the storage (for files) services within the app
const storage = getStorage(app)

const getData = async (pageName) => {
    try {
        const querySnapshot = await getDocs(collection(db, pageName))
        let newData = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        // return this newly created object on success
        return newData
    } catch (err) {
        // throw error otherwise
        throw err
    }
}

export { db, storage, getData }
