import { User } from "@/Types/types";
import { PlusCircle } from "lucide-react";
import { memo } from "react";

interface Prop {
  user: User;
  handler: (id: string) => void;
  handlerLoading: boolean;
}

const UserItem: React.FC<Prop> = ({ user, handler, handlerLoading }) => {
  const { username, id, avatar } = user;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
        <p>{user.username}</p>
      </div>
      <button onClick={() => handler(id)} disabled={handlerLoading}>
        <PlusCircle size={27} />
      </button>
    </div>
  );
};

export default memo(UserItem);
