import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserItem from "../Shared/UserItem";
import { useState } from "react";
import { User } from "@/Types/types";
import { Sampleusers } from "@/constants/sampleData";

const Search = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isFriendRequestSent, setIsFriendRequestSent] =
    useState<boolean>(false);
  const [users, setusers] = useState<User[]>(Sampleusers);

  const sendFriendRequest = (id: string) => {
    console.log(id);
    setIsFriendRequestSent(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Users</DialogTitle>
          <DialogDescription>
            Users can be searched by their username.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 items-start">
          <Label htmlFor="username" className="text-right font-semibold ">
            Username
          </Label>
          <Input id="username" placeholder="rombor" className="col-span-3" />
        </div>

        <div className="flex flex-col gap-4 items-start">
          {users &&
            users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                handler={sendFriendRequest}
                handlerLoading={isFriendRequestSent}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
