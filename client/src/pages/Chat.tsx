import AppLayout from "@/Components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageComponent from "@/Components/Shared/MessageComponent";
import React, { useEffect, useRef, useState } from "react";
import {
  Paperclip,
  Send,
  Image,
  Video,
  FileText,
  Music,
  X,
} from "lucide-react";
import { getSocket } from "@/Socket";
import {
  CONNECT_ERROR,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  NEW_ATTACHMENT
} from "@/constants/events";
import { useParams } from "react-router-dom";
import {
  useLazyChatDetailsQuery,
  useLazyGetMessagesQuery,
  useSendAttachmentsMutation,
} from "@/redux/rtkQueryAPIs";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import { useToast } from "@/hooks/use-toast";

import type { Attachment, ChatDetails, Message } from "@/Types/types";
import { useSocketEvent } from "@/hooks/utilityHooks";
import BouncingDotsLoader from "@/Components/Loader/BouncingDotLoader";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import FilePreviewCard from "@/Components/chat/FilePreviewCard";

const Chat = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const socket = getSocket();
  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  // const [page, setpage] = useState(1);
  const [MessageLoading, setMessageLoading] = useState<boolean>(false);
  const loadingPreviousMessages = useRef(false);

  const [selectedFiles, setSelectedFiles] = useState<Attachment[]>([]);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [isAttachmentLoading, setIsAttachmentLoading] = useState(false);

  const [getChatDeatils] = useLazyChatDetailsQuery();
  const [getMessages] = useLazyGetMessagesQuery();
  const [sendAttachments] = useSendAttachmentsMutation();

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: Attachment["type"]
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      file,
      type,
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setIsFilePreviewOpen(true);
  };

  const handleAttachmentSubmit = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsAttachmentLoading(true);
      setIsFilePreviewOpen(false);

      const formData = new FormData();
      formData.append("chatId", id);

      // Append each file to FormData
      selectedFiles.forEach(({ file }) => {
        formData.append("files", file);
      });

      await sendAttachments(formData).unwrap();

      setSelectedFiles([]);
      setIsFilePreviewOpen(false);
    } catch (error) {
      console.error("Error sending attachments:", error);
      toast({
        variant: "destructive",
        title: "Failed to send attachments",
      });
    } finally {
      setIsAttachmentLoading(false);
    }
  };

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

  let totalPages: number;
  const fetchMessages = async (page: number) => {
    setMessageLoading(true);
    loadingPreviousMessages.current = page > 1;
    try {
      await getMessages({ id, page }).then((res) => {
        
          setMessages(res.data.messages);
        totalPages = res.data.totalPagesPossible;
        console.log("totalpages", totalPages);
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed to fetch messages",
      });
    } finally {
      setMessageLoading(false);
    }
  };

  // const fetchMoreMessages = async (page: number) => {
  //   setMessageLoading(true);
  //   loadingPreviousMessages.current = page > 1;
  //   try {
  //     await getMessages({ id, page }).then((res) => {
  //       setMessages((prev) => [...res.data.messages, ...prev]);
  //       console.log("new messages", messages);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to fetch messages",
  //     });
  //   } finally {
  //     setMessageLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!loadingPreviousMessages.current) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
    loadingPreviousMessages.current = false;
  }, [messages]);

  useEffect(() => {
    fetchChatdetails();
    fetchMessages(1);
  }, [id]);

  // useEffect(() => {
  //   fetchMoreMessages(page);
  // }, [page]);

  // const handleScroll = () => {
  //   const container = containerRef.current;
  //   if (container) {
  //     // If scroll position is less than 100px from top
  //     if (container.scrollTop < 100 && page < totalPages) {
  //       setpage((prev) => prev + 1);
  //     } else {
  //       return;
  //     }
  //   }
  // };

  const NewMessaegeEventHandler = (data) => {
    // console.log(data);
    if (data.chatId !== id) return;
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

  const NewAttachmentEventHandler = (data: {
    message: {
      sender: {
        _id: string;
        userName: string;
      };
      attachments: Array<{
      resource_type: string;
      public_id: string;
      url: string;
    }>;
      chatId: string;
    };
    chatId: string;
  }) => {
    if (data.chatId !== id) return;
    
    const newMessage = {
      _id: Math.random().toString(), // temporary ID for real-time message
      sender: data.message.sender,
      attachments: data.message.attachments,
      content: "",
      chat: data.chatId,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  };

  //when a key in an object is an variable then that key is called dynamic key and that can be written inside the square bracket : - [DynamicKey]
  const EventToHandlerMappingObject = {
    [NEW_MESSAGE]: NewMessaegeEventHandler,
    [CONNECT_ERROR]: ConnectErrorEventHandler,
    [START_TYPING]: StartTypingEventHandler,
    [STOP_TYPING]: StopTypingEventHandler,
    [NEW_ATTACHMENT]: NewAttachmentEventHandler
  };

  useSocketEvent(socket, EventToHandlerMappingObject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(STOP_TYPING, { chatId: id, members: chat?.members });
    socket.emit(NEW_MESSAGE, { chatId: id, members: chat?.members, message });

    setMessage("");
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
        // onScroll={handleScroll}
        className="absolute top-0 left-0 right-0 bottom-[4.4rem] overflow-y-auto scrollbar-hide px-4 py-4 space-y-4 rounded-b-2xl"
      >
        {MessageLoading && <div>Messages Loading</div>}
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
            onChange={(e) => handleFileSelect(e, "image")}
            className="hidden"
            ref={imageInputRef}
            accept="image/*"
          />
          <input
            type="file"
            onChange={(e) => handleFileSelect(e, "video")}
            className="hidden"
            ref={videoInputRef}
            accept="video/*"
          />
          <input
            type="file"
            onChange={(e) => handleFileSelect(e, "audio")}
            className="hidden"
            ref={audioInputRef}
            accept="audio/*"
          />
          <input
            type="file"
            onChange={(e) => handleFileSelect(e, "document")}
            className="hidden"
            ref={documentInputRef}
            accept=".pdf,.doc,.docx"
          />

          <FilePreviewCard
            files={selectedFiles}
            onRemove={(index) => {
              setSelectedFiles((prev) => {
                const newFiles = prev.filter((_, idx) => idx !== index);
                if (newFiles.length === 0) {
                  setIsFilePreviewOpen(false);
                }
                return newFiles;
              });
            }}
            onSubmit={handleAttachmentSubmit}
            isOpen={isFilePreviewOpen}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isAttachmentLoading}
                className="text-gray-500 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-black/10"
              >
                {isAttachmentLoading ? (
                  <span className="animate-spin">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                ) : (
                  <Paperclip className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="glassmorphism p-1.5 border-0 dark:shadow-none animate-in fade-in-0 zoom-in-95"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px) saturate(150%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <DropdownMenuItem
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/10 dark:hover:bg-black/20 focus:bg-white/10 dark:focus:bg-black/20"
              >
                <Image className="h-4 w-4" />
                <span className="text-sm font-medium">Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/10 dark:hover:bg-black/20 focus:bg-white/10 dark:focus:bg-black/20"
              >
                <Video className="h-4 w-4" />
                <span className="text-sm font-medium">Video</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => audioInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/10 dark:hover:bg-black/20 focus:bg-white/10 dark:focus:bg-black/20"
              >
                <Music className="h-4 w-4" />
                <span className="text-sm font-medium">Audio</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => documentInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/10 dark:hover:bg-black/20 focus:bg-white/10 dark:focus:bg-black/20"
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Document</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
