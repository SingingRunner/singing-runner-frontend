export interface IAddUIProps {
  data: any
  handleAddRequest: (nickname: string, id: string) => () => void
  isRequestClicked: boolean
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClickExit: () => void
  onClickModalCheck: () => void
  onLoadMore: () => void
  receiverNickname: string
}
