import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { User } from "@/Types/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useInputValidation } from "6pp";
import UserItemForGroup from "../Shared/UserItemForGroup";
import {useToast} from "@/hooks/use-toast";
import { useCreateGroupMutation, useLazyGetMyFriendsQuery } from "@/redux/rtkQueryAPIs";


const Newgroup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [users, setusers] = useState<User[]>([]);
  const [GroupMembers, setGroupMembers] = useState<User[]>([]);
  const groupName = useInputValidation("");
  const [loading, setloading] = useState(false);
  const [createGroup] = useCreateGroupMutation();
  const {toast}  = useToast();
  const [getMyFriends] = useLazyGetMyFriendsQuery();

  const fetchMyFriends = async () => {
    try{

      setloading(true);
      await getMyFriends().then(({data}) => {
        setusers(data.users);
      })

    }catch(err){

      if(err instanceof Error){
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }else{
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        });
      }

    }finally{
      setloading(false);
    }
  }

  useEffect(() => {
    fetchMyFriends();
  },[])

  const addMemberToGroup = (id: string) => {
    const user = users.find((user) => user._id === id);
    if (user) {
      setGroupMembers([...GroupMembers, user]);
    }
  };

  const removeMemberFromGroup = (id: string) => {
    const user = GroupMembers.find((user) => user._id === id);
    if (user) {
      setGroupMembers(GroupMembers.filter((member) => member._id !== id));
    }
  };

  const submitHandler = async () => {
    try {
      setloading(true);
      await createGroup({
        name: groupName.value,
        members: GroupMembers.map((member) => member._id),
      }).then((res) => {
        console.log(res);
        if(res?.data?.success){
          toast({
            title: "Success",
            description: "Group created successfully",
            variant: "success"
          })
        }
        else{
          toast({
            title: "Error",
            description: res.error.data.message,
            variant: "destructive"
          })
        }
        
      })
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        })
      }
    } finally {
      onClose();
      setloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
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
            {users && users.length > 0 &&
              users.map((user) => (
                <UserItemForGroup
                  key={user._id}
                  user={user}
                  Addhandler={addMemberToGroup}
                  Removehandler={removeMemberFromGroup}
                  handlerLoading={
                    GroupMembers.find((member) => member._id === user._id)
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
            disabled={loading}
          >
            create
          </Button>
          <Button
            type="button"
            className="w-full bg-red-500/90 border-2 border-red-400 hover:bg-red-500 font-semibold"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Newgroup;
