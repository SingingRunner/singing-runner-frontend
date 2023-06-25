export interface ISocialSettingUIProps {
  onClickExit: () => void
  onLoadMore: () => void
  data: any
  onClickDelete: (id: string) => () => void
  keyword: string
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void
}
