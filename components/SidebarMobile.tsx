import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { LoaderIcon, toast } from "react-hot-toast";
import { useEffect, useState } from "react";

function SidebarMobile() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (session) {
      setDisabled(false);
    }
  }, [session, disabled]);

  return (
    <div className="p-2 flex flex-col min-h-screen bg-[#212228] text-black">
      <div className="flex-1">
        {/* Profile */}
        <motion.div
          initial={{
            y: -200,
            opacity: 0,
          }}
          transition={{ duration: 1 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="flex relative items-center justify-center transition-all ease-out duration-200"
        >
          {session && (
            <>
              <img
                onClick={() => signOut()}
                src={session.user?.image!}
                className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
                alt="profile"
              />
              <h1 className="block bg-[#131416] rounded-full p-3 text-base transition-all duration-200 text-center font-semibold text-gray-300">
                Hello! {session?.user?.name}
              </h1>
              <p className="opacity-0 absolute transition-all duration-500 text-sm group-hover:opacity-100 bg-[#131416] p-2 rounded-full rounded-bl-none top-[-15px] right-5">
                Click to Logout
              </p>
            </>
          )}
        </motion.div>

        {/* New Chat & Model Selection */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
          <NewChat disabled={disabled} />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
        </div>

        {/* Chats */}
        {loading && (
          <div className="flex justify-center items-center space-x-3 animate-pulse text-center text-white">
            <LoaderIcon style={{ fontSize: "20px" }} />
            <p>Loading your chats...</p>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarMobile;
