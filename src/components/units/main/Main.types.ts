import { Dispatch, SetStateAction } from "react";

export interface IMainUIProps {
  isClicked: boolean;
  handleClick: () => void;
  isBattleClicked: boolean;
  handleMatchCancel: () => void;
  timer: number;
  formatTime: (time: number) => string;
  showModal: boolean;
  setShowModal: (flag: boolean) => void;
  handleMatchAccept: () => void;
  handleBattleModeClick: () => void;
  handleMatchDecline: () => void;
  songTitle: string;
  singer: string;
  setShowWaiting: (flag: boolean) => void;
  showWaiting: boolean;
  setDummyUserId: Dispatch<SetStateAction<string>>;
  setDummyCharacter: Dispatch<SetStateAction<string>>;
  // onClickSocial: () => void;
  onClickMyRoom: () => void;
}
