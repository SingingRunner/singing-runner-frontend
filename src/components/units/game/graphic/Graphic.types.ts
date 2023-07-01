import { IPlayersInfo } from "../Game.types";

export interface IGrapicProps {
  preventEvent?: boolean;
  appliedItems: string[];
  playersInfo: IPlayersInfo[];
  offItem: (item: string) => void;
  decibel: number;
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
}
