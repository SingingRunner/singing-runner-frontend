import { IPlayersInfo } from "../Game.types";

export interface IGrapicProps {
  appliedItems: string[];
  playersInfo: IPlayersInfo[];
  offItem: (item: string) => void;
  decibel: number;
  muteAttack: {
    mid: boolean;
    right: boolean;
    left: boolean;
  };
  isFrozenActive: boolean;
}
