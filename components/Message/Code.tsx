
//@ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter";
//@ts-ignore  
import {atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {HiClipboard, HiClipboardCheck} from 'react-icons/hi'
import { useState } from "react";

type Props = {
    text : string;
}

function Code({text} : Props) {
    function formatCode(code: string) {
        // add line breaks after semicolons and opening braces
        code = code.replace(/;/g, ";\n").replace(/{/g, "{\n");
        // remove extra spaces before and after parentheses
        code = code.replace(/ *\(/g, "(").replace(/\) */g, ")");
        // indent lines inside curly braces
        let indentLevel = 0;
        code = code.replace(/{/g, () => {
          indentLevel++;
          return "{\n" + "  ".repeat(indentLevel);
        });
        code = code.replace(/}/g, () => {
          indentLevel--;
          return "\n" + "  ".repeat(indentLevel) + "}";
        });
    
        return code;
      }
      const formattedCode = formatCode(text);
      const [copy, setCopy] = useState(false);
      const handleCopy = () => {
        navigator.clipboard.writeText(formattedCode);
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 3000)
      }
  return (
    <div className="bg-gray-600 mx-2 grid place-items-center rounded-md">
          <div className="max-w-xl rounded-md overflow-hidden">
            <div className="flex items-center text-sm font-semibold justify-between px-4 text-white">
              <p>Example Code</p>
              {copy?(<button className="py-1 inline-flex items-center gap-1">
                <HiClipboardCheck/>
                <span>Copied</span>
              </button>) :(<button className="py-1 inline-flex items-center gap-1" onClick={handleCopy}>
                <HiClipboard/>
                <span>Copy</span>
              </button>)}
            </div>
          <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            wrapLongLines={true}
          >
            {formattedCode}
          </SyntaxHighlighter>
            </div>
        </div>
  )
}

export default Code
