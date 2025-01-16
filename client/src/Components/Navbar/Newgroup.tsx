import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sampleusers } from "@/constants/sampleData";
import { useState } from "react";
import { User } from "@/Types/types";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useInputValidation } from "6pp";
import UserItemForGroup from "../Shared/UserItemForGroup";

const Newgroup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [users, setusers] = useState<User[]>(Sampleusers);
  const [GroupMembers, setGroupMembers] = useState<User[]>([]);
  const groupName = useInputValidation("");

  const addMemberToGroup = (id: string) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setGroupMembers([...GroupMembers, user]);
    }
  };

  const removeMemberFromGroup = (id: string) => {
    const user = GroupMembers.find((user) => user.id === id);
    if (user) {
      setGroupMembers(GroupMembers.filter((member) => member.id !== id));
    }
  };

  const submitHandler = () => {
    console.log("Group Name", groupName.value);
    console.log("Group Members", GroupMembers);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}  >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Group</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2 items-start my-4">
              <Label htmlFor="username" className="text-right">
                Group Name
              </Label>
              <Input
                id="username"
                placeholder="Friends Forever"
                className="col-span-3"
                value={groupName.value}
                onChange={groupName.changeHandler}
              />
            </div>
          </DialogDescription>
          <div className="flex flex-col gap-4 items-start">
            {users &&
              users.map((user) => (
                <UserItemForGroup
                  key={user.id}
                  user={user}
                  Addhandler={addMemberToGroup}
                  Removehandler={removeMemberFromGroup}
                  handlerLoading={
                    GroupMembers.find((member) => member.id === user.id)
                      ? true
                      : false
                  }
                />
              ))}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-3 mt-5 md:flex-row md:justify-center ">
          <Button
            type="button"
            className="w-full bg-green-500/90 border-2 border-green-400 hover:bg-green-500 font-semibold"
            onClick={submitHandler}
          >
            create
          </Button>
          <Button
            type="button"
            className="w-full bg-red-500/90 border-2 border-red-400 hover:bg-red-500 font-semibold" onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Newgroup;



