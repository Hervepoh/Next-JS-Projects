"use client"

import {auth} from "../db/firebaseConfig.js";
import {useRouter} from "next/navigation"

export default function page() {

  const router = useRouter()

  console.log(auth.currentUser)

  const userData = {
    name:auth.currentUser?.displayName,
    email:auth.currentUser?.email,
  }


  const signOut = ()=> {
    auth.signOut()
    router.push('/')
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
  
      <div className="flex flex-col justify-center items-center text-center gap-2 text-white bg-gray-700 rounded-md p-4">
        <h2 className="font-bold text-2xl mt-2">{userData.name}</h2>
        <p className="text-gray-200 mt-2">{userData.email}</p>
        <button onClick={signOut}  className="bg-orange-400 hover:bg-orange-600 rounded-md text-white p-2	">Déconnexion</button>
      </div>
    </div>
  )
}
