export interface ISignUpUIProps {
  onClickSignUp: () => void;
  email: string;
  password: string;
  passwordCheck: string;
  emailError: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordCheckError: string;
  nickname: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nicknameError: string;
  validateEmail: () => void;
  checkDuplicateEmail: () => void;
  isSignUpButtonEnabled: boolean;
  dummyClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  checkDuplicateNickname: () => void;
  emailMessage: string;
  nicknameMessage: string;
  validateNickname: () => void;
}
