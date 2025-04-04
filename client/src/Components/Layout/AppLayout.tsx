"use client";

import React, { useCallback, useEffect, useState, FC, ReactNode } from "react";
import Navbar from "./Navbar";
import ChatList from "../Specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../Specific/Profile";
import {
  useLazyGetUnreadMessagesQuery,
  useMyChatsQuery,
} from "@/redux/rtkQueryAPIs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getSocket } from "@/Socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
} from "@/constants/events";
import { useSocketEvent } from "@/hooks/utilityHooks";
import { MessageAlert } from "@/Types/types";
import { useDispatch } from "react-redux";
import { incrementNotificationCount } from "@/redux/slices/chatSlice";


interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
      const socket = getSocket();
      // console.log(socket.id);

      const params = useParams();
      const CurrentchatId = params.id;
      const { toast } = useToast();

      const { data, error, isLoading, isError } = useMyChatsQuery({});

      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

      const [newMessaegAlerts, setNewMessageAlerts] = useState<MessageAlert[]>(
        []
      );
      const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

      const [getUnreadMessages] = useLazyGetUnreadMessagesQuery();

      const dispatch = useDispatch();

      const fetchUnreadMessages = async () => {
        try {
          await getUnreadMessages({}).then((res) => {
            console.log("unread messages:- ", res.data.result);
            setNewMessageAlerts(res.data.result);
          });
        } catch (err) {
          if (err instanceof Error) {
            console.log("Error fetching the unread messages", err);
            toast({
              variant: "destructive",
              title: "Error",
              description: `Error fetching the unread messages:- ${err.message}`,
            });
          } else {
            console.log("Error fetching the unread messages", err);
            toast({
              variant: "destructive",
              title: "Error",
              description: `Error fetching the unread messages:- ${err}`,
            });
          }
        }
      };

      useEffect(() => {
        fetchUnreadMessages();
      }, []);

      useEffect(() => {
        if (isError) {
          console.log("Error fetching the chats", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: `Error fetching the chats:- ${error}`,
          });
        }
      }, [error, isError]);

      // here we need to add another useEffect having chatId as its depency so that when ever user selects achat the chatid changes and if we have any chatAlerts in that chatid then we will remove that
      useEffect(() => {
        const chatAlert = newMessaegAlerts.find(
          (alert) => alert.chatId === CurrentchatId
        );
        if (chatAlert) {
          const updatedAlerts = newMessaegAlerts.filter(
            (alert) => alert.chatId !== CurrentchatId
          );
          setNewMessageAlerts(updatedAlerts);
        }
      }, [CurrentchatId, newMessaegAlerts]);

      const handledeleteChat = (
        e: React.MouseEvent<HTMLAnchorElement>,
        _id: string,
        groupChat: boolean
      ) => {
        e.preventDefault();
        if (groupChat) console.log("Delete Group Chat", _id);
        else {
          console.log("Delete Chat", _id);
        }
      };

      const NewMessageAlertEventHandler = ({ chatId }: { chatId: string }) => {
        // the second chat id is the param we got using useparams .it is the of the currentlyy opened chat.
        // so if the alert is for the curently opened chat then do nothing

        if (chatId === CurrentchatId) return;

        //here we wil update the state of newmessageAlert array
        const chatExist = newMessaegAlerts.find(
          (alert) => alert.chatId === chatId
        );
        if (chatExist) {
          const updatedAlerts = newMessaegAlerts.map((alert) => {
            if (alert.chatId === chatId) {
              return {
                chatId,
                count: alert.count + 1,
              };
            } else {
              return alert;
            }
          });
          setNewMessageAlerts(updatedAlerts);
        } else {
          setNewMessageAlerts((prev) => [...prev, { chatId, count: 1 }]);
        }
      };

      //this is the function which will get called when a online users event is emited from server and it will recieve a map of userId as key and the socketid as value
      //it will be transimited from the server only when you as a user connects to the socket and any other disconnects with the socket
      const onlineUserhandler = (onlineUsers: string[]) => {
        setOnlineUsers(onlineUsers);
      };

      const newRequestHandler = useCallback(() => {
        dispatch(incrementNotificationCount());
      }, []);

      const EventToHandlerMappingObject = {
        [NEW_MESSAGE_ALERT]: NewMessageAlertEventHandler,
        [ONLINE_USERS]: onlineUserhandler,
        [NEW_REQUEST]: newRequestHandler,
      };

      useSocketEvent(socket, EventToHandlerMappingObject);

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

          <div className="h-screen px-4 py-4 md:py-6 w-screen">
            <Navbar
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] gap-6 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] mt-4 md:mt-8  ">
              {/* Left section */}
              <div
                className={`hidden md:block glassmorphism rounded-2xl overflow-y-auto scrollbar-hide ${
                  isMobileMenuOpen ? "block" : "hidden"
                } md:block`}
              >
                {isError && <div>{`Error fethcing the chats:- ${error}`}</div>}
                {isLoading ? (
                  <div className="flex flex-col gap-3 w-full p-2">
                    {new Array(8).fill(0).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50"
                      >
                        {/* Avatar Skeleton */}
                        <Skeleton className="w-12 h-12 rounded-full shrink-0" />

                        <div className="flex-1 space-y-2">
                          {/* Name Skeleton */}
                          <Skeleton className="w-32 h-4" />

                          {/* Message Preview Skeleton */}
                          <div className="flex items-center justify-between">
                            <Skeleton className="w-48 h-3" />
                            {/* Time Skeleton */}
                            <Skeleton className="w-10 h-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ChatList
                    chats={data?.chats}
                    chatId={CurrentchatId}
                    newMessagesAlert={newMessaegAlerts}
                    onlineUsers={onlineUsers}
                    handleDeleteChat={handledeleteChat}
                    
                  />
                )}
              </div>

              <div
                className={`fixed bottom-0 top-20 left-0 transform ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:hidden transition duration-200 ease-in-out z-40 w-64 bg-white/80 dark:bg-black/80 backdrop-blur-xl backdrop-saturate-150 overflow-y-auto`}
              >
                <div className="py-6">
                  {isError && (
                    <div>{`Error fethcing the chats:- ${error}`}</div>
                  )}
                  {isLoading ? (
                    <div className="flex flex-col gap-2 w-full px-1">
                      {new Array(15).fill(0).map((_, i) => {
                        return (
                          <Skeleton
                            key={i}
                            className="w-full h-16 rounded-xl"
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <ChatList
                      chats={data?.chats}
                      chatId={CurrentchatId}
                      newMessagesAlert={newMessaegAlerts}
                      onlineUsers={["3", "4"]}
                      handleDeleteChat={handledeleteChat}
                      setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                  )}
                </div>
              </div>

              <div className="col-span-2 md:col-span-1  glassmorphism rounded-2xl ">
              {children}
              </div>

              <div className="hidden lg:block glassmorphism rounded-2xl">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      );
    };
  

export default AppLayout;
