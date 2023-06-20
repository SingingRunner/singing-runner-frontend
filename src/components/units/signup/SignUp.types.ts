export interface ISignUpUIProps {
  handleSignUpFinishClick: () => void;
  email: string;
  password: string;
  passwordCheck: string;
  emailErrorMessage: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordErrorMessage: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordCheckErrorMessage: string;
  nickname: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nicknameErrorMessage: string;
  validateEmail: () => void;
  checkDuplicateEmail: () => void;
  isSignUpButtonEnabled: boolean;
  dummyClick: () => void;
  handleLoginFinishClick: () => void;
  isLoginFinishButtonEnabled: boolean;
}
