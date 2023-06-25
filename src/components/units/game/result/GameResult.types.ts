export interface IGameResult {
  nickname: string;
  userScore: number;
  mmrDiff: number;
  isFriend: boolean;
  tier: string;
  userId: string;
  charcter: string;
}
export interface IGameResultUIProps {
  gameResult: IGameResult[];
  currentUserResult: {
    mmrDiff: number;
    tier: string;
  };
}
