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
  handleLoginClick: () => void;
  isLoginClicked: boolean;
  handleSignupClick: () => void;
  isSignupClicked: boolean;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  handleEmailChange: () => void;
  
}