import { User } from "@/Types/types";
import { PlusCircle } from "lucide-react";
import { memo } from "react";

interface Prop {
  user: User;
  handler: (id: string, userName:string) => void;
  requestStatus:string;
}

const UserItem: React.FC<Prop> = ({ user, handler, requestStatus }) => {
  const { userName, _id, profilePic } = user;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <img src={profilePic} alt={userName} className="w-10 h-10 rounded-full" />
        <p>{user.userName}</p>
      </div>
      {
        requestStatus === 'no' ? (<button onClick={() => handler(_id,userName)} >
        <PlusCircle size={27} />
      </button>) : (<span>
        {
          requestStatus
        }
      </span>)
      }
    </div>
  );
};

export default memo(UserItem);
