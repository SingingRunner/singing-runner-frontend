export interface ISocialSettingUIProps {
  onClickExit: () => void
  onLoadMore: () => void
  data: any
  keyword: string
  isDeleteClicked: boolean
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClickDelete: (id: string) => () => void
  handelDelete: () => void
  onClickCancel: () => void
}
