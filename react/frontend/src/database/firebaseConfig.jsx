// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import the firestore object from the module
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
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

const getURL = async (path) => {
    try {
        const storageRef = ref(storage)
        const imgRef = ref(storageRef, path)
        const data = await getDownloadURL(imgRef)
        return data
    } catch (err) {
        throw err
    }
}

export { db, storage, getData, getURL }
