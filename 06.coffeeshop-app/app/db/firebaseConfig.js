import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDWgpkJVWaOetQ0_GhgAM--R_z2h5s7I5s",
  authDomain: "coffeeshop-app-e3b53.firebaseapp.com",
  projectId: "coffeeshop-app-e3b53",
  storageBucket: "coffeeshop-app-e3b53.appspot.com",
  messagingSenderId: "1092640707257",
  appId: "1:1092640707257:web:14eb512c668bfcedca0168"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);