export interface IStartingUIProps {
  onClickComplete: () => void;
  handlePreviousImage: () => void;
  handleNextImage: () => void;
  characters: string[];
  currentImageIndex: number;
}
