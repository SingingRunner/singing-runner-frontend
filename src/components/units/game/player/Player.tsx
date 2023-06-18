interface IPlayerProps {
  character_idx: number;
  player_idx: number;
}

export const CHARACTERS_INFO = {
  beluga: { size: 0.6 },
  husky: { size: 0.7 },
  puma: { size: 0.7 },
};

export default function Player(props: IPlayerProps) {}
