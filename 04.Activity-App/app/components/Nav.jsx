"use client"

import { UserButton } from "@clerk/nextjs";
import { FaPlus, FaUser  } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { useSession, signIn, signOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Nav() {

  const router = useRouter()

  const {data: session} = useSession()
  return (
    <div className="absolute z-100 top-0 left-0 flex justify-between items-center w-full p-3 px-5 bg-black border-b border-b-[#ffb129]">
      
      <ul className=" text-white hidden md:flex itels-center gap-3">
        <li onClick={()=> router.push('/')} className=" hover:text-[#ff6030]"><a href="#">Home</a></li>
        <li className="  hover:text-[#ff6030]"><a href="#">Evenements</a></li>
        <li className="  hover:text-[#ff6030]"><a href="#">Agenda</a></li>
        <li className="  hover:text-[#ff6030]"><a href="#">Contact</a></li>
      </ul>
   
      {!session &&     
        <div className="flex items-center gap-3">
          <div onClick={()=> router.push('/create')} className="text-white hover:scale-110 cursor-pointer p-2 rounded-full hover:bg-[#ff6030] transition-all">
            <FaPlus />
          </div>
        <UserButton />
        </div>
      }
      </div>
  )
}
