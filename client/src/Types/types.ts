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
    members?: string[]
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
}

export interface User {
    id: string;
    username: string;
    avatar: string;
   
}

export interface Notifiaction {
    sender:{
        avatar: string,
        name: string
    },
    _id: string
}