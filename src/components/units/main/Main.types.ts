

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
  onClickSocial: () => void;
  onClickMyRoom: () => void;
  data: any;
  character: string;
  onClickCustomMode: () => void;
  onClickNotification: () => void;
}
