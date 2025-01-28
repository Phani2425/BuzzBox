import { useState } from "react";
import { useGetChatMessagesQuery } from "@/redux/rtkQueryAPIs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Loader2, Search, FileText, Image as ImageIcon, Headphones } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { chatMessagesAdminDashboard } from "@/Types/types";

const Messages = () => {
  const { data, isLoading } = useGetChatMessagesQuery({});
  const [search, setSearch] = useState("");

  const filteredMessages = data?.messages.filter((message:chatMessagesAdminDashboard) => 
    message.content.toLowerCase().includes(search.toLowerCase()) ||
    message.sender.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Messages List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Card className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4 p-4">
              {filteredMessages?.map((message:chatMessagesAdminDashboard) => (
                <div
                  key={message._id}
                  className="group bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/70 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">
                      {message.sender.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 text-xs 
                            bg-gray-100 dark:bg-zinc-700/50 rounded-full 
                            hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                          {attachment.resource_type === 'image' ? (
                            <ImageIcon className="h-4 w-4" />
                          ) : attachment.resource_type === 'raw' ? (
                            <Headphones className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                          <span className="truncate max-w-[150px]">
                            { `Attachment ${index + 1}`}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default Messages;