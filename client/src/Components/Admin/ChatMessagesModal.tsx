import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetSingleChatMessagesQuery } from "@/redux/rtkQueryAPIs";
import { Loader2, FileText } from "lucide-react";

interface ChatMessagesModalProps {
  chatId: string;
  isOpen: boolean;
  onClose: () => void;
}



const ChatMessagesModal = ({ chatId, isOpen, onClose }: ChatMessagesModalProps) => {
  const { data, isLoading } = useGetSingleChatMessagesQuery(chatId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Chat Messages</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100%-4rem)] mt-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {data?.messages.map((message) => (
                <div
                  key={message._id}
                  className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">
                      {message.sender.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.createdAt}
                    </span>
                  </div>
                  
                  <p className="text-sm">{message.content}</p>

                  {message.attachments?.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {message.attachments.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          Attachment {index + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ChatMessagesModal;