// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, /* getReactNativePersistence, */ getAuth, Auth, setPersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore,  } from "firebase/firestore";
import { getStorage, ref  } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAezShMDVPmVSOjMadxvZFzK2XQ9uyXpgs",
  authDomain: "jobnow-e8c11.firebaseapp.com",
  projectId: "jobnow-e8c11",
  storageBucket: "jobnow-e8c11.appspot.com",
  messagingSenderId: "414963899494",
  appId: "1:414963899494:web:d18434d83654ff9bc461a7",
  measurementId: "G-85GGXD4JZS"
};

// const [] = Google

let app: FirebaseApp
if (getApps.length === 0) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
} else {
    app = getApp()
}

const auth = getAuth(app)
// setPersistence(auth, getReactNativePersistence(ReactNativeAsyncStorage))

const firestore = getFirestore(app)

const storage = getStorage(app)

// if () {
//     auth = initializeAuth(app, {
//         persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//     });
// } else {
//     auth = getAuth(app)
// }

export { auth, firestore, storage }