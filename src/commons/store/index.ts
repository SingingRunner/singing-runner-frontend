import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const usersIdInfoState = atom<string[]>({
  key: `usersIdInfoState${uuidv4()}`,
  default: ["", "", ""],
});

interface IUserInfoState {
  userId: string;
  character: string;
  userKeynote: string;
}

// 현재 유저의 정보를 담는 state
export const userInfoState = atom<IUserInfoState>({
  key: `userInfoState${uuidv4()}`,
  default: { userId: "test01", character: "husky", userKeynote: "origin" },
});
