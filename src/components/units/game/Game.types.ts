import { Dispatch, SetStateAction } from "react";

export interface IGameUIProps {
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
  itemList: string[];
  useItem: (item: string) => void;
  offItem: (item: string) => void;
  decibel: number;
  hideLoading: boolean;
  loading: boolean;
  progress: number;
}
