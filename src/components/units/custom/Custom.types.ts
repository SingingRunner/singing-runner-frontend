import { Dispatch, SetStateAction } from "react";

export interface ICustomUIProps {
  userId: string;
  isHost: boolean;
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
  hostId: string;
  hostNickname: string;
  songId: string;
  songTitle: string;
  singer: string;
  mode: string;
  isHost: boolean;
  players: IPlayers[];
}

export interface IPlayers {
  userId: string;
  nickname: string;
  character: string;
  userTier: string;
  isFriend: boolean;
  isHost: boolean;
}

export interface IOnInviteHandlerData {
  roomId: number;
  hostId: string;
  hostNickname: string;
  songId: string;
  songTitle: string;
  singer: string;
  gameMode: string;
  userId: string;
  nickname: string;
  character: string;
  userTier: string;
  isFriend: true;
}
export interface IOnSetSongHandlerData {
  songId: string;
  songTitle: string;
  singer: string;
}
