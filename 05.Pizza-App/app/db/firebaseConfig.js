
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9J319aguQ0dGx4Np_C_K6Xsne4E669Jo",
  authDomain: "restaurant-bba77.firebaseapp.com",
  projectId: "restaurant-bba77",
  storageBucket: "restaurant-bba77.appspot.com",
  messagingSenderId: "791795012873",
  appId: "1:791795012873:web:2e5d6f0f78035066ed6fd8"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);