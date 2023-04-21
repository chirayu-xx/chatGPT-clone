import { SessionProvider } from "@/components/SessionProvider";
import SideBar from "@/components/SideBar";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ClientProvider from "@/components/ClientProvider";
import Login from "@/components/Login";

export const metadata = {
  title: "ChatGPT-clone",
  description: "Complete clone of chatGPT",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {
            !session ? <Login/> : (
              <div className="flex">
              {/* Client Provider Notification */}
              <ClientProvider/>
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
              )
          }
            
        </SessionProvider>
      </body>
    </html>
  );
}
