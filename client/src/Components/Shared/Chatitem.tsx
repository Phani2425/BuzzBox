import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatitemProps } from "@/Types/types";
import AvatarCard from "./AvatarCard";
import { cn } from "@/lib/utils";
import GroupAvatar from "./GroupAvatar";

const Chatitem: React.FC<ChatitemProps> = ({
  avatar = [],
  name,
  _id,
  lastMessage,
  groupChat = false,
  chatSelected,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    navigate(`/chat/${_id}`);
  };
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      className="w-full"
      onClick={clickHandler}
    >
      <div
        className={cn(
          "flex items-center gap-3 p-3  transition-colors duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800/50",
          chatSelected
            ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            : "bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-300",
          "relative"
        )}
      >
        {avatar.length > 0 ? (
          <GroupAvatar avatars={avatar} />
        ) : (
          <AvatarCard avatar={avatar} />
        )}

        <div className="flex flex-col">
          <p className="font-medium">{name}</p>
          {newMessageAlert && (
            <span className="text-sm text-green-600 dark:text-green-400">
              {newMessageAlert.count} New Messages
            </span>
          )}
          {
            lastMessage && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {lastMessage}
              </p>
            )
          }
        </div>

        {isOnline && (
          <div className="absolute right-3 w-2 h-2 bg-green-500 rounded-full" />
        )}
      </div>
    </Link>
  );
};

export default Chatitem;
