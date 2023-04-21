import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

type Props = {
  disabled: boolean
}

function NewChat({disabled} : Props) {
  const router = useRouter();
  const {data: session} = useSession();
  const createNewChat = async() => {
    if(disabled){
      return;
    }
    const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'chats'), {
      userId : session?.user?.email!,
      createdAt:serverTimestamp()
    })
    router.push(`/chat/${doc.id}`)
  }
  return (
    <div onClick={createNewChat} className={`border-gray-700 rounded-full border chatRow ${disabled && 'cursor-not-allowed'}`}>
        <PlusIcon className="h-4 w-4"/>
      <p>New Chat</p>
    </div>
  )
}

export default NewChat
