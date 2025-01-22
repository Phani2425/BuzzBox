//ok so previously when ever i need to estabilish or setupp soem socket eventy listners i needed to use the useEffect hook and socket.on and socket.off to do that. but the prolem is i need to write the useEffct hook again and agin in all the pages i need to setup socket event listners.

import { useEffect } from "react";
import { Socket } from "socket.io-client";

type EventHandler = (data: any) => void;

// ao to avaoid that i am creting a custom hook which will recieve the socket object and the eventToHandlerMapping object from the component and will setup the event listners for the socket object and will return a cleanup function which will remove the event listners when the component unmounts.

const useSocketEvent = (
  socket: Socket,
  mappedObject: Record<string, EventHandler>
) => {
  useEffect(() => {
    // USING FOR IN LOOP

    // for (const event in mappedObject) {
    //   socket.on(event, mappedObject[event]);
    // }
    // return () => {
    //   for (const event in mappedObject) {
    //     socket.off(event, mappedObject[event]);
    //   }
    // };

    // USING FOR EACH LOOP [for applying forEach loop i need to convert tthe object to array] [and we know that we can convert any object to arary of arrays using Object.entries() method]

    Object.entries(mappedObject).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(mappedObject).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, mappedObject]);
};

export { useSocketEvent };
