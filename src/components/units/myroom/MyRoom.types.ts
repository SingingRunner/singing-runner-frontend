export interface IMyRoomUIProps {
  onClickComplete: () => void;
  userData: any;
  onClickSetting: () => void;
  characters: string[];
  currentImageIndex: number;
  handlePreviousImage: () => void;
  handleNextImage: () => void;
  character: string;
  tier: string;
  mmr: number;
}
