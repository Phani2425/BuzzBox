export interface ChatitemProps {
    avatar?: string[]
    name?: string
    _id?: string
    lastMessage?: string,
    groupChat?: boolean,
    sameSender?: boolean,
    isOnline?: boolean,
    newMessageAlert?: {
        chatId: string,
        count:number
    },
    index?: number,
    handleDeleteChat?: any,
    members?: string[];
    setIsMobileMenuOpen?: () => void;

}

export interface chatList {
    w?: string;
    chats?: ChatitemProps[];
    chatId?: string;
    onlineUsers?: any[];
    newMessagesAlert?: {
        chatId:string,
        count:number
    }[];
    handleDeleteChat?: any;
    setIsMobileMenuOpen?: () => void;
}

export interface User {
    _id: string;
    userName: string;
    profilePic: string;
   
}

export interface Notifiaction {
    sender:{
        avatar: string,
        name: string
    },
    _id: string
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
  
  export type { Message, Attachment, MessageSender };