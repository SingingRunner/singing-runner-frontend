export interface ISocialUIProps {
  data: any;
  keyword: string;
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: () => void;
  onClickExit: () => void;
  onClickReplay: (id: string) => () => void;
  onClickSetting: () => void;
  onLoadMore: () => void;
}
