import { atom } from "recoil";

export const usersIdInfoState = atom<string[]>({
  key: "usersIdInfoState",
  default: ["", "", ""],
});
