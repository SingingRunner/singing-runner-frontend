import { atom } from "recoil";

export const socketState = atom<any>({
  key: "socketState",
  default: null,
});