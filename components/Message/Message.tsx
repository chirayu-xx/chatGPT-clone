import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import Code from "./Code";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";
  function isCode(str: string) {
    const codeRegex = /\{[\s\S]*\}/;
    const pythonRegex = /^( {4}|\t).*:\n([\s\S]*\n)*?(?=^( {4}|\t)|$)/m;
    const htmlRegex = /<("[^"]*"|'[^']*'|[^'">])*>/;

    return (
      codeRegex.test(str) ||
      pythonRegex.test(str) ||
      htmlRegex.test(str) ||
      /^[\s\S]*\bdef\b[\s\S]*$|^( {4}|\t).*:\n([\s\S]*\n)*?(?=^( {4}|\t)|$)/m.test(
        str
      )
    );
  }

  return (
    <div
      className={`w-full flex my-4 ${
        isChatGPT ? "justify-start" : "justify-end"
      } text-black"}`}
    >
      <motion.div 
      initial={{ opacity: 0,
      y:-100 }}
      whileInView={{ opacity: 1,
      y:0 }}
      viewport={{ once: true }}
      transition={{
        delay:0.5,
        duration:0.3
      }}
      className={`flex max-w-lg items-end `}>
        <img
          src={message.user.avatar}
          className="lg:h-10 lg:w-10 h-8 w-8 rounded-full"
          alt=""
        />
        {isCode(message.text) ? (
          <Code text={message.text} />
        ) : (
          <p
            className={`text-base p-5 mx-2 rounded-3xl ${
              isChatGPT
                ? "bg-[#ECEDED] rounded-bl-none"
                : "bg-[#569FFA] text-white rounded-br-none"
            }`}
          >
            {message.text}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Message;
