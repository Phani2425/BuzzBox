import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import {RootState} from '@/main'
import { useSelector } from "react-redux";

const socketContext = createContext();

const getSocket = () => {
  return useContext(socketContext);
};

const SocketProvider = ({ children }) => {

  const token = useSelector((state:RootState) => state.auth.token);

  const socket = useMemo(
    () => io(import.meta.env.VITE_SERVER_URL, { withCredentials: true,query: {
      token, // Pass token as query parameter
    } }),
    []
  );

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

export { SocketProvider, getSocket };
