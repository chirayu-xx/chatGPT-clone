'use client'    

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast"

function ClientProvider() {
  const {data:session} = useSession();
  
  return (
    <>
    <Toaster position="top-right"/>

    </>
  )
}

export default ClientProvider
