import { useEffect, useState } from "react";
import { io } from "socket.io-client";


export const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: { userId }, 
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};
