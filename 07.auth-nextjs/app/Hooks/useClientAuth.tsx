import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../db/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();


const useClientAuth = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [isFetch, setIsFetch] = useState(true);
  const router = useRouter();
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.push("/Dashboard");
    } catch (error) {
      console.log("erreur signUp");
    }
  };
  

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.push("/Dashboard");
    } catch (error) {
      console.log("erreur signIn");
    }
  };

  const loginWithGoogle = async ()=> {
    const result = await signInWithPopup(auth, provider);
    const user = result.user
    if(user){
      router.push("/Dashboard")
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        setIsFetch(false);
      } else {
        setUser(null);
        setIsFetch(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const redirectIfAuthenticated = () => {
    if (user) {
      router.push('/Dashboard');
    }
  };


  return { user, isFetch, signUp, signIn, redirectIfAuthenticated, loginWithGoogle };
};

export default useClientAuth;
