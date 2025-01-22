import AppLayout from "@/Components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageComponent from "@/Components/Shared/MessageComponent";
import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { getSocket } from "@/Socket";
import {
  CONNECT_ERROR,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "@/constants/events";
import { useParams } from "react-router-dom";
import {
  useLazyChatDetailsQuery,
  useLazyGetMessagesQuery,
} from "@/redux/rtkQueryAPIs";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import { useToast } from "@/hooks/use-toast";

import type { ChatDetails, Message } from "@/Types/types";
import { useSocketEvent } from "@/hooks/utilityHooks";
import BouncingDotsLoader from "@/Components/Loader/BouncingDotLoader";
import { motion } from "framer-motion";

const Chat = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const socket = getSocket();
  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const [getChatDeatils] = useLazyChatDetailsQuery();
  const [getMessages] = useLazyGetMessagesQuery();

  const fetchChatdetails = async () => {
    try {
      await getChatDeatils(id).then((res) => {
        // console.log(res);
        setChat(res.data.chat);
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed to fetch chat details",
      });
    }
  };

  const fetchMessages = async () => {
    try {
      await getMessages(id).then((res) => {
        // console.log(res.data);
        setMessages(res.data.messages);
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed to fetch messages",
      });
    }
  };

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    fetchChatdetails();
    fetchMessages();
  }, [id]);

  const NewMessaegeEventHandler = (data) => {
    console.log(data);
    setMessages((prev) => [...prev, data.message]);
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  };

  const ConnectErrorEventHandler = (err: Error) => {
    console.log(err);
    toast({
      variant: "destructive",
      title: "Failed to connect to server",
    });
  };

  const StartTypingEventHandler = ({
    chatId,
    sender,
  }: {
    chatId: string;
    sender: { _id: string; name: string };
  }) => {
    if (chatId === id && sender._id !== user._id) {
      setIsTyping(true);
      setTypingUser(sender.name);
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  };

  const StopTypingEventHandler = ({
    chatId,
    sender,
  }: {
    chatId: string;
    sender: { _id: string; name: string };
  }) => {
    if (chatId === id && sender._id !== user._id) {
      setIsTyping(false);
      setTypingUser(null);
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  };

  //when a key in an object is an variable then that key is called dynamic key and that can be written inside the square bracket : - [DynamicKey]
  const EventToHandlerMappingObject = {
    [NEW_MESSAGE]: NewMessaegeEventHandler,
    [CONNECT_ERROR]: ConnectErrorEventHandler,
    [START_TYPING]: StartTypingEventHandler,
    [STOP_TYPING]: StopTypingEventHandler,
  };

  useSocketEvent(socket, EventToHandlerMappingObject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(STOP_TYPING, { chatId: id, members: chat?.members });
    socket.emit(NEW_MESSAGE, { chatId: id, members: chat?.members, message });

    setMessage("");
  };

  const uploadFile = () => {
    fileInputRef.current?.click();
  };

  //we will create a sample data for a user who is loged in actually thi will be send to the message component so that it could be identified wheather the message is send by the user currently viewing it so that we can apply different style to it

  //later we will bring it from the redux store

  const loggedUser = user;

  let typingTimeout: NodeJS.Timeout;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(typingTimeout);

    setMessage(e.target.value);
    socket.emit(START_TYPING, { chatId: id, members: chat?.members });

    typingTimeout = setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId: id, members: chat?.members });
    }, 4000);
  };

  return (
    <div className="h-full relative flex flex-col">
      {/* Messages Container */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 right-0 bottom-[4.4rem] overflow-y-auto scrollbar-hide px-4 py-4 space-y-4 rounded-b-2xl"
      >
        {messages &&
          messages.length > 0 &&
          messages.map((msg, i: number) => (
            <MessageComponent key={i} msg={msg} loggedUser={loggedUser} />
          ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 py-3 mt-4 p-2 bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-lg w-fit"
          >
            <BouncingDotsLoader />
            <span className="ml-2 text-gray-600 dark:text-gray-300">
              {typingUser} is typing...
            </span>
          </motion.div>
        )}
      </div>

      {/* Input Form */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/50 dark:bg-black/50 border-t border-gray-200 dark:border-zinc-800 backdrop-blur-xl rounded-b-2xl ">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={uploadFile}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Input
            value={message}
            onChange={changeHandler}
            onBlur={() =>
              socket.emit(STOP_TYPING, { chatId: id, members: chat?.members })
            }
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-gray-200 dark:border-zinc-800 focus:ring-green-500 dark:focus:ring-[#00A3FF]"
          />

          <Button
            type="submit"
            size="icon"
            className="bg-green-500 hover:bg-green-600 dark:bg-[#00A3FF] dark:hover:bg-blue-600"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppLayout()(Chat);
