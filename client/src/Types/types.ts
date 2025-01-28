import React, { Dispatch, SetStateAction } from "react";


export interface ChatitemProps {
  grpAvatar?: string[];
  name?: string;
  _id: string;
  lastMessage?: string;
  groupChat?: boolean;
  chatSelected?: boolean;
  isOnline?: boolean;
  newMessageAlert?: {
    chatId: string;
    count: number;
  };
  handleDeleteChat: (
    e: React.MouseEvent<HTMLAnchorElement>,
    _id: string,
    groupChat: boolean
  ) => void;
  members?: string[];
  setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface chatList {
  w?: string;
  chats?: ChatitemProps[];
  chatId?: string;
  onlineUsers?: string[];
  newMessagesAlert?: {
    chatId: string;
    count: number;
  }[];
  handleDeleteChat: (
    e: React.MouseEvent<HTMLAnchorElement>,
    _id: string,
    groupChat: boolean
  ) => void;
  setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface User {
  _id: string;
  userName: string;
  profilePic: string;
}

export interface Notifiaction {
  sender: {
    profilePic: string;
    userName: string;
    _id: string;
  };
  _id: string;
  status: string;
  receiver: string;
}

interface Attachment {
  public_id: string;
  url: string;
  _id: string;
  resource_type: "image" | "video" | "raw" | "document";
}

interface MessageSender {
  _id: string;
  userName: string;
}

interface Message {
  attachments?: Attachment[];
  content: string;
  _id: string;
  sender: MessageSender;
  chat: string;
  createdAt: string;
}

interface NewAttachment {
  resource_type: string;
  public_id: string;
  url: string;
  file?: File;
}

interface NewMessage {
  _id: string;
  sender: {
    _id: string;
    userName: string;
  };
  attachments?: NewAttachment[];
  content: string;
  chat: string;
  createdAt: string;
}

interface ChatDetails {
  _id: string;
  creator: string;
  groupchat: boolean;
  members: string[];
  name: string;
}

interface MessageAlert {
  chatId: string;
  count: number;
}

interface Attachment {
  file: File;
  resource_type: "image" | "video" | "raw" | "document";
}

type attachhmentforMessage ={
  _id: string;
  resource_type: "image" | "video" | "raw" | "document";
  public_id: string;
  url: string;
}



interface chatMessagesAdminDashboard {
  _id: string;
  content: string;
  createdAt: string;
  sender: {
    _id: string;
    userName: string;
    profilePic: string;
  };
  attachments: attachhmentforMessage[];
}

interface groupChatForAdminDashboard {
  _id: string;
  indexId: number;
  avtar: string[];
  name: string;
  membersCount: number;
  membersPictures: string[];
  messagesCount: number;
  creator: {
    userName: string;
    profilePic: string;
  };
}

interface userForAdminDashboard {
  userName: string;
  profilePic: string;
  email: string;
  friendsCount: number;
  groupsCount: number;
}

interface SentRequest {
  _id: string;
  sender: string;
  receiver: {
    _id: string;
    userName: string;
    profilePic: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
}

interface SelectedAttachmentForSend {
  file: File;
  type: 'image' | 'video' | 'raw' | 'document';
}

interface messageForRealtime  {
  _id: string;
  chat: string;
  content: string;
  sender: {
    _id: string;
    userName: string;
  }
  createdAt: string;
};

export type {
  Message,
  Attachment,
  MessageSender,
  ChatDetails,
  MessageAlert,
  chatMessagesAdminDashboard,
  groupChatForAdminDashboard,
  userForAdminDashboard,
  SentRequest,
  SelectedAttachmentForSend,
  messageForRealtime,
  NewMessage
};
