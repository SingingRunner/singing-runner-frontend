import { atom, selector } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "../libraries/getAccessToken";
import { IRoomInfoState } from "../../components/units/custom/Custom.types";
import { IGameResult } from "../../components/units/game/result/GameResult.types";

interface IUserInfoState {
  userId: string;
  character: string;
  userKeynote: string;
}

// 현재 유저의 정보를 담는 state -> 🚨 deprecated (userIdState 사용하기)
export const userInfoState = atom<IUserInfoState>({
  key: `userInfoState${uuidv4()}`,
  default: { userId: "test01", character: "beluga", userKeynote: "origin" },
});

export const accessTokenState = atom({
  key: `accessTokenState${uuidv4()}`,
  default: "",
});

export const refreshAccessTokenLoadable = selector({
  key: `refreshAccessTokenLoadable${uuidv4()}`,
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});

// custom 방 정보
export const roomInfoState = atom<IRoomInfoState>({
  key: `roomInfoState${uuidv4()}`,
  default: {
    mode: "아이템",
    singer: "",
    songTitle: "",
    songId: "",
    playerCount: 1,
  },
});

export const userIdState = atom<string>({
  key: `userIdState${uuidv4()}`,
  default: "",
});

export const gameResultState = atom<IGameResult[]>({
  key: `gameResultState${uuidv4()}`,
  default: [
    {
      nickname: "",
      score: 0,
      mmrDiff: 0,
      isFreind: false,
      tier: "bronze",
      userId: "",
    },
  ],
});
