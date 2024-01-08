import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAezShMDVPmVSOjMadxvZFzK2XQ9uyXpgs",
  authDomain: "jobnow-e8c11.firebaseapp.com",
  projectId: "jobnow-e8c11",
  storageBucket: "jobnow-e8c11.appspot.com",
  messagingSenderId: "414963899494",
  appId: "1:414963899494:web:d18434d83654ff9bc461a7",
  measurementId: "G-85GGXD4JZS"
};


let app: FirebaseApp;
if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  // popupRedirectResolver: AsyncStorage
});

const firestore = getFirestore(app);

const storage = getStorage(app);

export { firebaseAuth as auth, firestore, storage };