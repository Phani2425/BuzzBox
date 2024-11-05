import React from "react";
import Chatitem from "../Shared/Chatitem";

interface chatList {
    w?: string;
    chats?: string[];
    chatId?: string;
    onlineUsers?: any[];
    newMessagesAlert?: any[];
    handleDeleteChat?: any;
}

const ChatList:React.FC<chatList> = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return <div className={`w-[${w}] flex flex-col`}>

    {
        chats.map((chat, index) => {
            return <Chatitem/>
        })
    }

  </div>;
};

export default ChatList;
