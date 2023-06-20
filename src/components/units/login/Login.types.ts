export interface ILoginUIProps {
  email: string;
  password: string;
  emailErrorMessage: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordErrorMessage: string;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateEmail: () => void;
  dummyClick: () => void;
  handleLoginClick: () => void;
  isLoginButtonEnabled: boolean;
}
