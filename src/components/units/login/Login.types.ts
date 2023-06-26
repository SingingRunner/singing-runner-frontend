export interface ILoginUIProps {
  email: string;
  password: string;
  emailError: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateEmail: () => void;
  dummyClick: () => void;
  onClickLogin: () => void;
  isLoginButtonEnabled: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
