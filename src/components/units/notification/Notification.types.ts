export interface INotificationUIProps {
  onClickExit: () => void
  onLoadMore: () => void
  data: any
  onClickCheck: (id: string, nickname: string) => () => void
  isCheckClicked: boolean
  onClickAccept: () => void
  onClickDeny: () => void
  senderName: string
  convertTimeToUnit: (time: string) => string
}
