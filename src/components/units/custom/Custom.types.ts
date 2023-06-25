import { Dispatch, SetStateAction } from "react";

export interface ICustomUIProps {
  isHost: boolean;
  playersData: IPlayersData[];
  roomInfo: IRoomInfoState;
  onClickExit: () => void;
  onClickMode: () => void;
  onClickSong: () => void;
  onClickGameStart: () => void;
  isSongModalOpen: boolean;
  setIsSongModalOpen: Dispatch<SetStateAction<boolean>>;
  isPrevModalOpen: boolean;
  setIsPrevModalOpen: Dispatch<SetStateAction<boolean>>;
  isNotHostModalOpen: boolean;
  setIsNotHostModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IRoomInfoState {
  roomId: string;
  mode: string;
  singer: string;
  songTitle: string;
  songId: string;
  playerCount: number;
}

export interface IPlayersData {
  userId: string;
  userTier: string;
  nickname: string;
  isHost: boolean;
  isFriend: boolean;
  character: string;
}
