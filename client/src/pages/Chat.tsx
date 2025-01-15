import AppLayout from "@/Components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageComponent from "@/Components/Shared/MessageComponent";
import {  useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { messages } from "@/constants/sampleData";
// import type { Message } from "@/Types/types";

const Chat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  const uploadFile = () => {
    fileInputRef.current?.click();
  };

  //we will create a sample data for a user who is loged in actually thi will be send to the message component so that it could be identified wheather the message is send by the user currently viewing it so that we can apply different style to it

  //later we will bring it from the redux store

  const loggedUser  = {
    _id: "1",
    username: "rombor"
  }

  return (
    <div className="h-full relative flex flex-col">
      {/* Messages Container */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 right-0 bottom-[4.4rem] overflow-y-auto scrollbar-hide px-4 py-4 space-y-4 rounded-b-2xl"
      >
        {messages.map((msg) => (
           <MessageComponent key={msg._id} msg={msg} loggedUser={loggedUser} />
        ))}
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
            onChange={(e) => setMessage(e.target.value)}
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