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
    <div className="flex">
      <div className="bg-[#202123] max-w-xs overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
    <div className="flex flex-1 bg-[#131416] flex-col h-screen">
     {/* Chat  */}
     <Chat chatId={id}/> 
     {/* ChatInput  */}
     <ChatInput chatId = {id}/>
    </div>
    </div>
  )
}

export default ChatPage
