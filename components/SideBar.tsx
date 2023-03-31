'use client'
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { LoaderIcon, toast} from "react-hot-toast";
import { useEffect } from "react";

function SideBar() {
  const {data:session} = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, "chats"), orderBy('createdAt', 'asc'))
  )

  
  return (
    <div className="p-2 flex flex-col min-h-screen
    ">
        <div className="flex-1">
            <div>
            {/* New Chat  */}
            <NewChat/>
            <div className="hidden  sm:inline">
              <ModelSelection/>
            </div>
            </div>
            {
              loading && (
                <div className="flex justify-center items-center space-x-3 animate-pulse text-center text-white">
                  <LoaderIcon style={{fontSize:'20px'}}/>
                  <p>Loading your chats...</p>
                </div>
              )
            }
            {/* Map through the chatrows  */}
            <div className="flex flex-col my-2 space-y-2">
            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
              ))}
              </div>

        </div>
        <div className=" flex text-white group font-semibold flex-col items-center justify-center transition-all ease-out duration-200">
         
        {session && (
          <img onClick={() => signOut()} src={session.user?.image!} className='h-12 w-12 rounded-full  cursor-pointer mx-auto mb-2 hover:opacity-50' alt='profile'/>
          )}
          <h1 className="block transition-all duration-200 text-lg font-semibold text-gray-300 group-hover:hidden">Hello! {session?.user?.name}</h1>
          <p className="hidden transition-all duration-200 group-hover:block">Click to Logout</p>
          </div>
    </div>
  )
}

export default SideBar
