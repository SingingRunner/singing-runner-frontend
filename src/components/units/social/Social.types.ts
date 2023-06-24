export interface ISocialUIProps {
  onClickSetting: () => void;
  onClickExit: () => void;
  onLoadMore: () => void;
  data: any;
  onClickReplay: (id: string) => () => void;
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nickname: string;
}
