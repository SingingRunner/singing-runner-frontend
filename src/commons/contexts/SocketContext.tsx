// SocketContext.tsx
import React, { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";

// SocketContext 생성
export interface ISocketContext {
  socket: Socket | null;
  socketConnect: (userId: string) => Socket;
  socketDisconnect: () => void;
}

export const SocketContext = createContext<ISocketContext | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketConnect = (userId: string) => {
    /* 🚨 배포 시 사용 */
    const newSocket = io("https://injungle.shop", {
      path: "/api/socket.io",
      query: { userId },
    });
    /* 로컬 테스트 시 사용 */
    // const newSocket = io("http://localhost:3000", { query: { userId } });
    setSocket(newSocket);
    console.log("⭐️ 소켓 연결");
    return newSocket;
  };

  const socketDisconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("🍕 소켓 종료");
    }
  };

  return (
    <SocketContext.Provider value={{ socket, socketConnect, socketDisconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
