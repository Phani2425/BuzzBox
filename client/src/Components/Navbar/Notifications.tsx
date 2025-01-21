import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Notifiaction } from "@/Types/types";
import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAcceptFriendRequestMutation,
  useLazyGetRequestsQuery,
  useRejectFriendRequestMutation,
} from "@/redux/rtkQueryAPIs";
import { useToast } from "@/hooks/use-toast";

const Notifications = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();

  const friendrequestHandler = async (id: string, accept: boolean) => {
    try {
      setIsLoading(true);
      if (accept) {
        await acceptFriendRequest(id).then(() => {
          toast({
            title: "Friend Request Accepted",
            description: "You have accepted the friend request",
          });
          fetchAllRequests();
        });
      } else {
        await rejectFriendRequest(id).then(() => {
          toast({
            title: "Friend Request Rejected",
            description: "You have rejected the friend request",
          });
          fetchAllRequests();
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  };

  const [requests, setrequests] = useState([]);
  const [getReuests] = useLazyGetRequestsQuery();

  const fetchAllRequests = async () => {
    await getReuests()
      .then(({ data }) => {
        console.log(data);
        setrequests(data.receivedRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            <p className="text-center">
              {requests && requests.length > 0 ? (
                <div className="flex flex-col gap-3 mt-3">
                  {requests.map((notification, index) => {
                    return (
                      <NotificationItem
                        key={index}
                        notification={notification}
                        handler={friendrequestHandler}
                        loading={isLoading}
                      />
                    );
                  })}
                </div>
              ) : (
                "No notifications"
              )}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;

const NotificationItem = memo(
  ({
    notification,
    handler,
    loading,
  }: {
    notification: Notifiaction;
    handler: (id: string, accept: boolean) => void;
    loading: boolean;
  }) => {
    return (
      <div className="flex items-center justify-between">
        <img
          src={notification.sender.profilePic}
          alt={notification.sender.userName}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col gap-1 items-start">
          <p>{notification.sender.userName}</p>
          <p>sent you a friend request</p>
        </div>

        <div className="flex gap-2">
          <Button
            className="bg-green-600/80 hover:bg-green-600/90 text-white"
            onClick={() => handler(notification._id, true)}
            disabled={loading}
          >
            Accept
          </Button>
          <Button
            className="bg-red-600/80 hover:bg-red-600/90 text-white"
            onClick={() => handler(notification._id, false)}
            disabled={loading}
          >
            Reject
          </Button>
        </div>
      </div>
    );
  }
);
