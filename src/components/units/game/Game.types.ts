import {
  IQuery,
  IReplaySongDto,
  IReplayUserInfoDto,
} from "../../../commons/types/generated/types";
import { ILyric } from "./lyric/Lyric.types";

export interface IGameProps {
  isReplay?: boolean;
  replayData?: Pick<IQuery, "playReplay"> | undefined;
  replayLoadingData?: {
    gameSong: IReplaySongDto | undefined;
    characterList: IReplayUserInfoDto[] | undefined;
    userVocal: string | undefined;
    replayKeynote: number | undefined;
  };
  replayUserId?: string;
  replayEvent?: any;
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
  superTime: {
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
