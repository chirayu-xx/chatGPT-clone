"use client"; 
import { db } from "@/firebase";
import useSWR from 'swr'
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react"
import {toast} from 'react-hot-toast'
import ModelSelection from "./ModelSelection";
type Props = {
    chatId: string
  }

function ChatInput({chatId}: Props) {
    const [prompt, setPrompt] = useState("")
    const {data: session} = useSession();
    const {data: model} = useSWR('model',{
      fallbackData: 'text-davinci-003'
  })
    // useSWR  to get a model 

    const sendMessage = async(e : FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if(!prompt) return;
        const input = prompt.trim();
        setPrompt("");
        const message: Message = {
            text:input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }
        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message);
        // Toast for loading  
        const notification = toast.loading('Please wait...Model is generating')
        await fetch('/api/askQuestion', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            // toast notification for succesful
            toast.success('Model has responded', {
                id:notification
            }) 
        })
    }
  return (
    <div className="bg-[#282932] text-gray-400 rounded-none text-sm">
      <form onSubmit={sendMessage} className="p-5 items-center space-x-5 flex disabled:cursor-not-allowed disabled:text-gray-300">
        <input
        className="bg-[#1F1F24] p-4 rounded-full items-center focus:outline-none flex-1" 
        disabled={!session}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        type="text"
        placeholder="Type your message..."
        />
        <button
        disabled={!session || !prompt}
         type="submit"
         className="bg-[#569FFA] hover:opacity-50 text-white font-bold p-4 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
         >
            <PaperAirplaneIcon className="lg:h-6 lg:w-6 h-4 w-4 -rotate-45"/>
        </button>
      </form>
      <div className="md:hidden">
        {/* Model selection  */}
        <ModelSelection/>
      </div>
    </div>
  )
}

export default ChatInput
