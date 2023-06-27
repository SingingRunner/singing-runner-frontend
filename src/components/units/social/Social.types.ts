export interface ISocialUIProps {
  hasMore: boolean;
  isLoadingAfterSearch: boolean;
  hasFetched: boolean;
  loading: boolean;
  data: any;
  keyword: string;
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: () => void;
  onClickExit: () => void;
  onClickReplay: (id: string) => () => void;
  onClickSetting: () => void;
  onLoadMore: () => void;
}
