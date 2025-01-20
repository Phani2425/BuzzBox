import { User } from "@/Types/types";
import { PlusCircle } from "lucide-react";
import { memo } from "react";

interface Prop {
  user: User;
  handler: (id: string) => void;
  handlerLoading: boolean;
}

const UserItem: React.FC<Prop> = ({ user, handler, handlerLoading }) => {
  const { userName, _id, profilePic } = user;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <img src={profilePic} alt={userName} className="w-10 h-10 rounded-full" />
        <p>{user.userName}</p>
      </div>
      <button onClick={() => handler(_id)} disabled={handlerLoading}>
        <PlusCircle size={27} />
      </button>
    </div>
  );
};

export default memo(UserItem);
