import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sampleNotifications } from "@/constants/sampleData";
import { Notifiaction } from "@/Types/types";
import { memo } from "react";
import { Button } from "@/components/ui/button";

const Notifications = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const friendrequestHandler = (id: string, accept: boolean) => {
    console.log(id);
    console.log("accept", accept);
  };

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
              {sampleNotifications.length > 0 ? (
                <div className="flex flex-col gap-3 mt-3">
                  {sampleNotifications.map((notification, index) => {
                    return (
                      <NotificationItem
                        key={index}
                        notification={notification}
                        handler={friendrequestHandler}
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
  }: {
    notification: Notifiaction;
    handler: (id: string, accept: boolean) => void;
  }) => {
    return (
      <div className="flex items-center justify-between">
        <img
          src={notification.sender.avatar}
          alt={notification.sender.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col gap-1 items-start">
          <p>{notification.sender.name}</p>
          <p>sent you a friend request</p>
        </div>

        <div className="flex gap-2">
          <Button
            className="bg-green-600/80 hover:bg-green-600/90 text-white"
            onClick={() => handler(notification._id, true)}
          >
            Accept
          </Button>
          <Button
            className="bg-red-600/80 hover:bg-red-600/90 text-white"
            onClick={() => handler(notification._id, false)}
          >
            Reject
          </Button>
        </div>
      </div>
    );
  }
);
