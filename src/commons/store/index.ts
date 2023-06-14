import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const usersIdInfoState = atom<string[]>({
  key: `usersIdInfoState${uuidv4()}`,
  default: ["", "", ""],
});
