export interface IProfileCardProps {
  character: string;
  online?: boolean;
  offline?: boolean;
  add?: boolean;
  nickname?: string;
  hilightNickname?: string;
  tier?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  margin?: string;
  friendId?: string;
}
