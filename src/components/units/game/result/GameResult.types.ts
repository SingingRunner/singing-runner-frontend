export interface IGameResult {
  nickname: string;
  score: number;
  mmrDiff: number;
  isFreind: boolean;
  tier: string;
  userId: string;
}
export interface IGameResultUIProps {
  gameResult: IGameResult[];
  currentUserResult: {
    mmrDiff: number;
    tier: string;
  };
}
