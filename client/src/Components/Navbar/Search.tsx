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
import { SentRequest, User } from "@/Types/types";
import {
  useLazyGetRequestsQuery,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} from "@/redux/rtkQueryAPIs";
import { useToast } from "@/hooks/use-toast";

const Search = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {

  const [userName, setuserName] = useState<string>("");
  const [users, setusers] = useState<User[]>([]);
  const [searchUsers] = useLazySearchUsersQuery();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const { toast } = useToast();

  const [requestData, setrequestData] = useState<SentRequest[]>([]);
  const [getRequests] = useLazyGetRequestsQuery();

  useEffect(() => {
    getRequests({}).then(({data}) => {
       setrequestData(data.sentRequests);
    })
  },[])


  const HandlesendFriendRequest = async (id: string, userName: string) => {
    try {
      sendFriendRequest(id)
        .then((res) => {
          console.log(res);
          toast({
            title: "Request Sent",
            description: `Friend request to ${userName} sent successfully.`,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });

        getRequests({}).then(({data}) => {
          setrequestData(data.sentRequests);
       })
    } catch (err) {
      if (err instanceof Error) {
        console.log(
          "error occured while sending friend request:- ",
          err.message
        );
      } else {
        console.log("unexpected error occured");
      }
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(e.target.value.trim());
  };

  useEffect(() => {
    searchUsers("").then(({ data }) => {
      const startIndex = Math.random()* (data.users.length/2)
      const trimmedData = data.users.slice(startIndex, startIndex+7);
      setusers(trimmedData);
    });
  }, []);

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

  const getRequestStatus = (id:string) => {
    
    if(requestData.length > 0) {

      const resreq = requestData.find((req) => req.receiver._id === id)

      if(resreq){
       return resreq.status;
      }
      else{
        return 'no'
      }

    }else{
      return 'no'
    }
  }

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
                handler={HandlesendFriendRequest}
                requestStatus={ getRequestStatus(user._id)}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
