// SocketContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// SocketContext 생성
export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("https://injungle.shop", { path: "/api/socket.io" });
    setSocket(newSocket);
    // return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
