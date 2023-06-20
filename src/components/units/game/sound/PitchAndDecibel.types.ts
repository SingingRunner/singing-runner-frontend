import { Dispatch, SetStateAction } from "react";
import { IPlayersInfo } from "../Game.types";

export interface IPitchAndDecibelProps {
  setPlayersInfo: Dispatch<SetStateAction<IPlayersInfo[]>>;
  isLoadComplete: boolean;
  originAnswer: number[];
  keyUpAnswer: number[];
  keyDownAnswer: number[];
  isKeyUp: boolean;
  setKeyUp: Dispatch<SetStateAction<boolean>>;
  isKeyDown: boolean;
  setKeyDown: Dispatch<SetStateAction<boolean>>;
  isFrozen: boolean;
  setFrozen: Dispatch<SetStateAction<boolean>>;
  isMute: boolean;
  setMute: Dispatch<SetStateAction<boolean>>;
  setDecibel: Dispatch<SetStateAction<number>>;
  sources: React.MutableRefObject<AudioBufferSourceNode[]>;
  setIsLoadComplete: Dispatch<SetStateAction<boolean>>;
  setStartTime: Dispatch<SetStateAction<number>>;
}

export interface ISocketScore {
  score: number;
  user: string;
}
