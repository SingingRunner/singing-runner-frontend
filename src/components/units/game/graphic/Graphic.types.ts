import { Dispatch, SetStateAction } from "react";
import { IPlayersInfo } from "../Game.types";

export interface IGrapicProps {
  playersInfo: IPlayersInfo[];
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
}
