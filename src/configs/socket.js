import { io } from "socket.io-client";


let socket = null;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: { userId },
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
  return socket;
};
export const getSocket = () => {
    if (!socket) {
      console.warn("⚠️ Socket is not initialized!");
    }
    return socket;
  };
