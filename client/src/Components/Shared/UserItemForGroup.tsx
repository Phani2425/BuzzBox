import { MinusCircle, PlusCircle } from "lucide-react";

interface Prop {
    user: User;
    Addhandler: (id: string) => void;
    Removehandler: (id: string) => void;
    handlerLoading: boolean;
  }

const UserItemForGroup: React.FC<Prop> = ({
    user,
    Addhandler,
    Removehandler,
    handlerLoading,
  }) => {
    const { username, id, avatar } = user;
  
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
          <p>{user.username}</p>
        </div>
        {handlerLoading ? (
          <button onClick={() => Removehandler(id)}>
            <MinusCircle size={27} />
          </button>
        ) : (
          <button onClick={() => Addhandler(id)}>
            <PlusCircle size={27} />
          </button>
        )}
      </div>
    );
  };
  

  export default UserItemForGroup;