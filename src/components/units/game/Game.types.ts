export interface IGameUIProps {
  // switchPlayerToSnowman: (index: number) => void;
  // switchSnowmanToPlayer: (index: number) => void;
  // stopPlayer: (index: number) => void;
  // startPlayer: (index: number) => void;
  // movePlayer: (index: number, direction: "forward" | "backward") => void;
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
  playersActiveItem: string[];
  itemList: string[];
  useItem: (item: string) => void;
  offItem: (item: string) => void;
  decibel: number;
}
