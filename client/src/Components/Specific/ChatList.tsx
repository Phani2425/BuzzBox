import React from "react";
import Chatitem from "../Shared/Chatitem";
import { chatList } from "@/Types/types";

const ChatList: React.FC<chatList> = ({
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
  setIsMobileMenuOpen
}) => {


  return (
    <div className={`w-[${w}] flex flex-col`}>
      {chats.map((chat, index) => {
        // first we will destructure thr data from the chat object
        const { avatar, _id, name, groupChat, members } = chat;
        const newMessageAlert = newMessagesAlert.find(
          (alert) => alert.chatId === _id
        );

        const isOnline = members?.some((member: string) =>
           onlineUsers.includes(member)
        );

        return (
          <Chatitem
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            _id={_id}
            key={_id}
            chatSelected={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            index={index}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
