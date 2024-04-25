
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBD0glcSYPiGucFftyyJvg63Cub7SbhB5E",
  authDomain: "barcelone-app.firebaseapp.com",
  projectId: "barcelone-app",
  storageBucket: "barcelone-app.appspot.com",
  messagingSenderId: "355946484576",
  appId: "1:355946484576:web:44fa8d45891c38623fc405"
};






export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);