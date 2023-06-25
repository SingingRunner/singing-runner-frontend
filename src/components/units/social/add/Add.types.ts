export interface IAddUIProps {
  data: any
  handleAddRequest: (id: string) => () => void
  nickname: string
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClickExit: () => void
  onLoadMore: () => void
}
