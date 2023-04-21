import { DocumentData } from "firebase/firestore";
import {motion} from 'framer-motion'
import { useState } from "react";
import Code from "./Code";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  

  const isChatGPT = message.user.name === "ChatGPT";
  function isCode(str : string) {
    const codeRegex = /\{[\s\S]*\}/;
    const pythonRegex = /^( {4}|\t).*:\n([\s\S]*\n)*?(?=^( {4}|\t)|$)/m;
  
    return codeRegex.test(str) || pythonRegex.test(str)|| /^[\s\S]*\bdef\b[\s\S]*$|^( {4}|\t).*:\n([\s\S]*\n)*?(?=^( {4}|\t)|$)/m.test(str);
  }

  return (
    <motion.div 
    initial={{
      y:200,
      opacity:0
  }}
  transition={{ type: "spring", stiffness: 100, delay:0.1, duration:1000 }}
  whileInView={{opacity:1, y:0}}
  viewport={{once:true}}
    className={`w-full my-5 flex  ${isChatGPT ? 'justify-start' : 'justify-end'} text-black"}`}>
      <div className={`flex max-w-lg items-end `}>
        <img src={message.user.avatar} className="lg:h-10 lg:w-10 h-8 w-8 rounded-full" alt="" />
        {isCode(message.text) ? (
         <Code text= {message.text}/> 
        ) : (
          <p className={`text-base p-5 mx-2 rounded-3xl ${isChatGPT ? 'bg-[#ECEDED] rounded-bl-none':'bg-[#569FFA] text-white rounded-br-none'}`}>{message.text}</p>
        )}
      </div>
    </motion.div>
  );
}

export default Message;
