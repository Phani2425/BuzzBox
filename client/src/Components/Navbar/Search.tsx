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
import { useEffect, useState } from "react";
import { User } from "@/Types/types";
import { useLazySearchUsersQuery } from "@/redux/rtkQueryAPIs";

const Search = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isFriendRequestSent, setIsFriendRequestSent] =
    useState<boolean>(false);
  const [userName, setuserName] = useState<string>("");
  const [users, setusers] = useState<User[]>([]);

  const [searchUsers] = useLazySearchUsersQuery();

  const sendFriendRequest = (id: string) => {
    console.log(id);
    setIsFriendRequestSent(true);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(e.target.value.trim());
  };

  useEffect(() => {
    searchUsers('').then(({data}) => {
      const trimmedData = data.users.slice(0,7);
      setusers(trimmedData);
    })
  },[])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userName.length > 3) {
        searchUsers(userName).then(({ data }) => {
          console.log(data);
          if (data) {
            setusers(data.users);
          }
        });
      } else {
        return;
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userName]);

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
          <Input
            id="username"
            placeholder="rombor"
            className="col-span-3"
            onChange={changeHandler}
            value={userName}
          />
        </div>

        <div className="flex flex-col gap-4 items-start">
          {users &&
            users.map((user) => (
              <UserItem
                key={user._id}
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
