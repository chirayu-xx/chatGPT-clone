import Chat from "@/components/Chat"
import ChatInput from "@/components/ChatInput"
import SideBar from "@/components/SideBar"

type Props = {
  params: {
    id:string
  }
}

function ChatPage({params: {id}}: Props) {
  return (
    <div className="flex flex-1 bg-[#131416] flex-col h-screen">
     {/* Chat  */}
     <Chat chatId={id}/> 
     {/* ChatInput  */}
     <ChatInput chatId = {id}/>
    </div>
  )
}

export default ChatPage
