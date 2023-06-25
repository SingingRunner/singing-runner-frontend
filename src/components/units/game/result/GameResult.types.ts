export interface IGameResult {
  nickname: string;
  score: number;
  mmrDiff: number;
  isFriend: boolean;
  tier: string;
  userId: string;
  character: string;
}
export interface IGameResultUIProps {
  gameResult: IGameResult[];
  currentUserResult: {
    mmrDiff: number;
    tier: string;
  };
}
