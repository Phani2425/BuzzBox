import { useState } from "react";
import { useGetAllChatsQuery } from "@/redux/rtkQueryAPIs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import ChatMessagesModal from "./ChatMessagesModal";
import { groupChatForAdminDashboard } from "@/Types/types";

const Groups = () => {
  const { data, isLoading } = useGetAllChatsQuery({});
  const [search, setSearch] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const filteredChats = data?.chats.filter((chat:groupChatForAdminDashboard) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Chats</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChats?.map((chat:groupChatForAdminDashboard) => (
                <TableRow key={chat._id}>
                  <TableCell>{chat.indexId}</TableCell>
                  <TableCell>{chat.name}</TableCell>
                  <TableCell>{chat.membersCount}</TableCell>
                  <TableCell>{chat.messagesCount}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedChatId(chat._id)}
                    >
                      View Messages
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ChatMessagesModal
        chatId={selectedChatId!}
        isOpen={!!selectedChatId}
        onClose={() => setSelectedChatId(null)}
      />
    </div>
  );
};

export default Groups;