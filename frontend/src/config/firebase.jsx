// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseApiKey, firebaseAppId, firebaseAuthDomain, firebaseMessageSenderId, firebaseProjectId, firebaseStorageBucket } from "./environment-variables";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessageSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMessageSenderId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);