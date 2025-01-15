"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import ChatList from "../Specific/ChatList";
import { SampleChats } from "@/constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../Specific/Profile";

type WrappedComponentProps = {
  [key: string]: any; // Use appropriate type for your props
};

const AppLayout =
  () => (WrappedComponent: React.ComponentType<WrappedComponentProps>) => {
    return (props: WrappedComponentProps) => {
      const params = useParams();
      const chatId = params.id;

      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

      const handledeleteChat = (
        e: React.MouseEvent<HTMLDivElement>,
        _id: string,
        groupChat: boolean
      ) => {
        e.preventDefault();
        if (groupChat) console.log("Delete Group Chat", _id);
        else {
          console.log("Delete Chat", _id);
        }
      };

      return (
        <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black ">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231d4ed8' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div
            className="pointer-events-none absolute left-1/2 bottom-0 w-[800px] h-[800px] -translate-x-1/2 translate-y-1/2 bg-green-400 dark:bg-[#1d4ed8] opacity-30 rounded-full"
            style={{
              filter: "blur(100px)",
              animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />

          <div className="h-[calc(100vh-4rem)] px-4 py-6">
            <Navbar
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] gap-6 h-[calc(100%-2rem)] mt-8 ">
              {/* Left section */}
              <div
                className={`hidden md:block glassmorphism rounded-2xl ${
                  isMobileMenuOpen ? "block" : "hidden"
                } md:block`}
              >
                <ChatList
                  chats={SampleChats}
                  chatId={chatId}
                  newMessagesAlert={[
                    {
                      chatId: "1",
                      count: 5,
                    },
                    {
                      chatId: "2",
                      count: 3,
                    },
                  ]}
                  onlineUsers={["3", "4"]}
                  handleDeleteChat={handledeleteChat}
                />
              </div>

              <div
                className={`fixed inset-y-0 left-0 transform ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:hidden transition duration-200 ease-in-out z-40 w-64 bg-white/80 dark:bg-black/80 backdrop-blur-xl backdrop-saturate-150 overflow-y-auto`}
              >
                <div className="p-6">Mobile Menu Content</div>
              </div>

              <div className="col-span-2 md:col-span-1 glassmorphism rounded-2xl ">
                <WrappedComponent {...props} />
              </div>

              <div className="hidden lg:block glassmorphism rounded-2xl">
                <Profile />
              </div>
            </div>
          </div>

          <style jsx global>{`
            @keyframes pulse {
              0%,
              100% {
                opacity: 0.3;
              }
              50% {
                opacity: 0.15;
              }
            }

            .glassmorphism {
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(10px) saturate(150%);
              border: 1px solid rgba(255, 255, 255, 0.1);
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }
          `}</style>
        </div>
      );
    };
  };

export default AppLayout;
