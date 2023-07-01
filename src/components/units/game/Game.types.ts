import { ILyric } from "./lyric/Lyric.types";

export interface IGameProps {
  isReplay?: boolean;
  playerId?: string;
}
export interface IGameUIProps {
  playerId?: string;
  preventEvent?: boolean;
  appliedItems: string[];
  songInfo: {
    title: string;
    singer: string;
  };
  playersInfo: IPlayersInfo[];
  offItem: (item: string) => void;
  decibel: number;
  isLoadComplete: boolean;
  progress: number;
  startTime: number;
  muteAttack: {
    mid: boolean;
    right: boolean;
    left: boolean;
  };
  isFrozenActive: boolean;
  isFrozenActiveRight: boolean;
  isFrozenActiveLeft: boolean;
  isTerminated: boolean;
  lyrics: ILyric[];
}

export interface IPlayersInfo {
  userId: string;
  character: string;
  activeItem: string;
  score: number;
  position: string;
}

export interface ISocketItem {
  userId: string;
  item: string;
}
