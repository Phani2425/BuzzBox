import { PlusCircle } from "lucide-react";
import { memo } from "react";

const UserItem = ({ user, handler, handlerLoading }) => {
  const { username, _id, avatar } = user;

  return (
    <div key={user.id} className="flex items-center gap-3">
      <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
      <p>{user.username}</p>
      <button onClick={() => handler(_id)} disabled={handlerLoading}>
        <PlusCircle />
      </button>
    </div>
  );
};

export default memo(UserItem);
