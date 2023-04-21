import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import {motion} from 'framer-motion'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
    id:string;
}

function ChatRow({id}: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const {data : session} = useSession();
    const [active, setActive] = useState(false);
    const [messages] = useCollection(
            collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    )

    useEffect(() => {
        if(!pathname) return;
        setActive(pathname.includes(id));
    }, [pathname])

    const removeChat = async() => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace('/');
    }

  return (
    <Link  href={`chat/${id}`}>
        <motion.div 
        initial={{
            y:200,
            opacity:0
        }}
        transition={{ type: "spring", stiffness: 100, delay:0.3, duration:1000 }}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        className={`chatRow w-full rounded-full justify-center ${active && 'bg-[#131416]'}`}>
        <ChatBubbleLeftIcon className="h-5 w-5 text-white"/>
        <p className="flex-1 hidden md:inline-flex truncate text-white text-base">
            {messages?.docs[messages?.docs.length-1]?.data().text || "New Chat"}
        </p>
        <TrashIcon onClick={removeChat} className="h-5 2-5 text-white hover:text-red-700"/>
        </motion.div>
    </Link>
  )
}

export default ChatRow
