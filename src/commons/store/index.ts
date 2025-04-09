import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { getAccessToken } from "../libraries/getAccessToken";
import { IRoomInfoState } from "../../components/units/custom/Custom.types";
import { IGameResult } from "../../components/units/game/result/GameResult.types";
import { IModalProps } from "../../components/commons/modal/Modal";

export const kakaoUserResponseState = atom(null);

export const googleUserResponseState = atom(null);

export const accessTokenState = atom("");

export const refreshAccessTokenAtom = atom(
  null, // 읽기용 atom은 null로 설정 (직접 참조하지 않음)
  async (_, set) => {
    const newAccessToken = await getAccessToken();
    if (newAccessToken) {
      set(accessTokenState, newAccessToken);
    }
    return newAccessToken;
  }
);

export const userIdState = atom<string>("");

// custom 방 정보
export const roomInfoState = atomWithReset<IRoomInfoState>({
  roomId: "",
  mode: "아이템",
  singer: "",
  songTitle: "",
  songId: "",
  players: [],
  hostId: "",
  hostNickname: "",
  isHost: false, // 현재 유저가 방장인지
});

export const gameResultState = atom<IGameResult[]>([
  {
    nickname: "",
    userScore: 0,
    mmrDiff: 0,
    isFriend: false,
    tier: "bronze",
    userId: "",
    charcter: "",
  },
]);

export const isNotificationState = atom<boolean>(false);

export const customInviteInfoState = atom<{ hostId: string; nickname: string }>(
  {
    hostId: "",
    nickname: "",
  }
);

type IGlobalModalProps = IModalProps & {
  isOpen: boolean;
};
export const globalModalState = atomWithReset<IGlobalModalProps>({
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
});

export const replayStatusState = atom<"START" | "END" | "LOADING">("LOADING");
