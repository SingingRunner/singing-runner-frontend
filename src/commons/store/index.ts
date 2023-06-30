import { atom, selector } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "../libraries/getAccessToken";
import { IRoomInfoState } from "../../components/units/custom/Custom.types";
import { IGameResult } from "../../components/units/game/result/GameResult.types";
import { IModalProps } from "../../components/commons/modal/Modal";

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

export const userIdState = atom<string>({
  key: `userIdState${uuidv4()}`,
  default: "",
});

// custom 방 정보
export const roomInfoState = atom<IRoomInfoState>({
  key: `roomInfoState${uuidv4()}`,
  default: {
    roomId: "",
    mode: "아이템",
    singer: "",
    songTitle: "",
    songId: "",
    players: [],
    hostId: "",
    hostNickname: "",
    isHost: false, // 현재 유저가 방장인지
  },
});

export const gameResultState = atom<IGameResult[]>({
  key: `gameResultState${uuidv4()}`,
  default: [
    {
      nickname: "",
      userScore: 0,
      mmrDiff: 0,
      isFriend: false,
      tier: "bronze",
      userId: "",
      charcter: "",
    },
  ],
});

export const isNotificationState = atom<boolean>({
  key: `isNotificationState${uuidv4()}`,
  default: false,
});

export const customInviteInfoState = atom<{ hostId: string; nickname: string }>(
  {
    key: `customInviteInfoState${uuidv4()}`,
    default: {
      hostId: "",
      nickname: "",
    },
  }
);

type IGlobalModalProps = IModalProps & {
  isOpen: boolean;
};
export const globalModalState = atom<IGlobalModalProps>({
  key: `globalModalState${uuidv4()}`,
  default: {
    /* 모달 노출 여부 */
    isOpen: false,
    /* 아이콘 */
    isCheck: false, // 체크 표시 아이콘인 경우 true
    /* 텍스트 */
    hilightText: "", // 강조 표시해야하는 닉네임
    firstText: "", // 모달 알림 내용
    secondText: "", // 알림이 두 줄인 경우 두번째 텍스트
    /* 버튼 */
    buttonText: "", // 버튼이 두개인 경우, 오른쪽 버튼의 텍스트
    leftButtonText: "", // 버튼이 두개인 경우, 왼쪽 버튼의 텍스트
    /* 노래 정보 */
    songTitle: "",
    singer: "",
    onClickRight: () => {},
    onClickLeft: () => {},
  },
});
