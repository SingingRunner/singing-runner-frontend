import { Dispatch, SetStateAction } from "react";

export interface IGrapicProps {
  playersScore: number[];
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
}
