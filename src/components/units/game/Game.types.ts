export interface IGameUIProps {
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
