import { Dispatch, SetStateAction } from 'react';

export interface ChatitemProps {
    grpAvatar?: string[]
    name?: string
    _id?: string
    lastMessage?: string,
    groupChat?: boolean,
    chatSelected?: boolean,
    isOnline?: boolean,
    newMessageAlert?: {
        chatId: string,
        count:number
    },
    index?: number,
    handleDeleteChat?: any,
    members?: string[];
    setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;

}

export interface chatList {
    w?: string;
    chats?: ChatitemProps[];
    chatId?: string;
    onlineUsers?: string[];
    newMessagesAlert?: {
        chatId:string,
        count:number
    }[];
    handleDeleteChat?: any;
    setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface User {
    _id: string;
    userName: string;
    profilePic: string;
   
}

export interface Notifiaction {
    sender:{
       profilePic:string,
       userName:string,
       _id:string
    },
    _id: string,
    status: string,
    receiver: string,
}

interface Attachment {
    public_id: string;
    url: string;
  }
  
  interface MessageSender {
    _id: string;
    username: string;
  }
  
  interface Message {
    attachments?: Attachment[];
    content: string;
    _id: string;
    sender: MessageSender;
    chat: string;
    createdAt: string;
  }

  interface ChatDetails {
    _id:string;
    creator:string;
    groupchat:boolean;
    members:string[];
    name:string;
  }

  interface MessageAlert {
    chatId:string;
    count:number;
  }

  interface Attachment {
    file: File;
    type: "image" | "video" | "raw" | "document";
  }
  
  export type { Message, Attachment, MessageSender,ChatDetails,MessageAlert };