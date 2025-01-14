import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import UserItem from "../Shared/UserItem";

const users = [
  {
    id: 1,
    username: "rombor",
    avatar: "https://avatars",
  },
  {
    id: 2,
    username: "phani",
    avatar: "https://avatars",
  },
  {
    id: 3,
    username: "bhusan",
    avatar: "https://avatars",
  },
  {
    id: 4,
    username: "mohanty",
    avatar: "https://avatars",
  },
];

const Search = () => {
  return (
    <Dialog open={true}>
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

        <div>
          {users &&
            users.map((user) => (
              <UserItem user={user} handler={() => {}} handlerLoading={false} />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
