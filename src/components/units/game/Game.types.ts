import { Dispatch, SetStateAction } from "react";

export interface IGameUIProps {
  songInfo: {
    title: string;
    singer: string;
  };
  playersInfo: IPlayersInfo[];
  totalPlayers: number;
  activeItem: {
    mute: boolean;
    frozen: boolean;
    cloud: boolean;
    keyDown: boolean;
    keyUp: boolean;
    shield: boolean;
  };
  setActiveItem: Dispatch<
    SetStateAction<{
      mute: boolean;
      frozen: boolean;
      cloud: boolean;
      keyDown: boolean;
      keyUp: boolean;
      shield: boolean;
    }>
  >;
  playersActiveItem: string[];
  offItem: (item: string) => void;
  decibel: number;
  isLoadComplete: boolean;
  progress: number;
  startTime: number;
}

export interface IPlayersInfo {
  userId: string;
  character: string;
  activeItem: string;
  score: number;
}
