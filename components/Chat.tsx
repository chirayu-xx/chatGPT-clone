"use client"
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { db } from "@/firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { LoaderIcon } from "react-hot-toast";

type Props = {
    chatId: string
  }

function Chat({chatId}: Props) {
  const {data:session} = useSession();
  const [messages,loading] = useCollection(session && 
    query(
      collection(
        db,
        'users',
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      orderBy('createdAt', 'asc')
    ));
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {
              loading && (
                <div className="flex justify-center items-center space-x-3 animate-pulse text-center text-white">
                  <LoaderIcon style={{fontSize:'20px'}}/>
                  <p>Loading your history...</p>
                </div>
              )
            }
      {
        messages?.empty && (
          <>
          <p className="mt-10 text-center text-white">Type a prompt in below to get started</p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce items-center justify-center"/>
          </>
        )
      }
      {
        messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))
      }
    </div>
  )
}

export default Chat