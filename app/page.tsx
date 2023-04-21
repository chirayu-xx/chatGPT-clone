import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function Home() {
    const session = await getServerSession(authOptions)
  return (
    
      <div className="text-white flex flex-col items-center p-2 gap-10 bg-[#131416] justify-center min-h-screen flex-1 overflow-y-auto overflow-x-hidden">
        <h1 className="font-bold m-2  text-2xl md:text-3xl lg:text-5xl"> Welcome to Our App</h1>
        <h2 className="font-semibold m-2 text xl md:text-2xl lg
        text-3xl">Create A New Chat to explore the App</h2>
      </div>
  );
}

export default Home;
