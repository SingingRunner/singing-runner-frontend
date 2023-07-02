export interface INicknameUIProps {
  onClickComplete: () => void;
  nickname: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nicknameError: string;
  isNicknameButtonEnabled: boolean;
  dummyClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  checkDuplicateNickname: () => void;
  nicknameMessage: string;
  validateNickname: () => void;
}
