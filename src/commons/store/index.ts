import { atom } from "recoil";
import { Socket } from "socket.io-client";

export const socketState = atom<Socket | null>({
  key: "socketState",
  default: null,
});

export const usersIdInfoState = atom<string[]>({
  key: "usersIdInfoState",
  default: ["", "", ""],
});
