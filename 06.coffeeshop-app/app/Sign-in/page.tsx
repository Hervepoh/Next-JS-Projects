"use client"

import { auth } from "../db/firebaseConfig";
import { useRouter } from "next/navigation";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import GoogleLogo from "../../public/logo-google.webp"
import Image from "next/image";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {

  const provider = new GoogleAuthProvider();

  const router = useRouter();


  const goToDashboard = async ()=> {
    const result = await signInWithPopup(auth, provider);
    const user = result.user

    if(user){
      router.push("/Dashboard")
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
     
        <button onClick={goToDashboard} type="button" className=" bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 p-2 flex items-center gap-2">
          <Image src={GoogleLogo} width={30} height={30} alt="Logo Google" />
            <span>Connexion via Google</span>
        </button>
    </div>
  );
}
