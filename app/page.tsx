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
      <div className="text-white flex flex-col items-center justify-center min-h-screen flex-1 overflow-y-auto overflow-x-hidden">

        <h1 className="text-3xl  md:text-5xl font-bold m-3">
          Ultimate ChatGPT Clone
        </h1>
        <Link
          href={"https://github.com/chirayu-xx"}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <div className="group flex flex-col items-center justify-center space-x-1 mb-20">
            <h1 className="text-3xl group-hover:text-gray-500 transition-all ease-out duration-200  md:text-5xl font-semibold">
              By Chirayu
            </h1>
            <AiFillGithub
              style={{ fontSize: "50px" }}
              className="hidden  group-hover:block"
            />
          </div>
        </Link>
        <div className="flex md:flex-row flex-col space-x-2 text-center">
          <div>
            <div className="flex flex-col items-center justify-center mb-5">
              <SunIcon className="h-8 w-8" />
              <h2>Examples</h2>
            </div>
            <div className="space-y-2">
              <p className="infoText">&ldquo;Explain Something to me&ldquo;</p>
              <p className="infoText">
                &ldquo;What is the difference between dog and cat&ldquo;
              </p>
              <p className="infoText">
                &ldquo;What is the color of the sun?&ldquo;
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center mb-5">
              <BoltIcon className="h-8 w-8" />
              <h2>Capabilities</h2>
            </div>
            <div className="space-y-2">
              <p className="infoText">&ldquo;Change the ChatGPT model to use</p>
              <p className="infoText">
                &ldquo;Messages are stored are in Firebase&apos;s
                Firestore&ldquo;
              </p>
              <p className="infoText">
                &ldquo;Hot toast notification when ChatGPT is generating&ldquo;
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center mb-5">
              <ExclamationTriangleIcon className="h-8 w-8" />
              <h2>Limitations</h2>
            </div>
            <div className="space-y-2">
              <p className="infoText">
                &ldquo;May occasionally produce harmful instructions or biased
                content&ldquo;
              </p>
              <p className="infoText">
                &ldquo;What is the difference between dog and cat&ldquo;
              </p>
              <p className="infoText">
                &ldquo;Limited knowledge of world and events after 2021&ldquo;
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
