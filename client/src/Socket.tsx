import { createContext, useContext, useMemo } from "react";
import io, { Socket } from "socket.io-client";
import {RootState} from '@/main'
import { useSelector } from "react-redux";

const socketContext = createContext<Socket | undefined>(undefined);

const getSocket = (): Socket => {
  const socket = useContext(socketContext);
  if (!socket) {
    throw new Error("Socket not found. Make sure you are using the SocketProvider.");
  }
  return socket;
};

const SocketProvider = ({ children } :{children:React.ReactNode}) => {

  const token = useSelector((state:RootState) => state.auth.token);

  const socket:Socket = useMemo(
    () => io(import.meta.env.VITE_SERVER_URL, { withCredentials: true,query: {
      token, // Pass token as query parameter
    } }),
    [token]
  );

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

export { SocketProvider, getSocket };
