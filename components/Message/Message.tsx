import { DocumentData } from "firebase/firestore";

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
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-3 lg:px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} className="h-8 w-8" alt="" />
        {isCode(message.text) ? (
         <Code text= {message.text}/> 
        ) : (
          <p className="pt-1 text-sm">{message.text}</p>
        )}
      </div>
    </div>
  );
}

export default Message;
