export interface IMyRoomUIProps {
  onClickComplete: () => void;
  userData: any;
  characters: string[];
  currentImageIndex: number;
  handlePreviousImage: () => void;
  handleNextImage: () => void;
  character: string;
  tier: string;
  mmr: number;
}
