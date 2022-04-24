import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBafhQW2Y3YKtdVfQOSA7TPni6vbStq79w",
    authDomain: "techtrainingionicproject.firebaseapp.com",
    projectId: "techtrainingionicproject",
    storageBucket: "techtrainingionicproject.appspot.com",
    messagingSenderId: "149673749585",
    appId: "1:149673749585:web:1fec235f6c90b81e6cdc70"
  }
};
const app = initializeApp(environment.firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

