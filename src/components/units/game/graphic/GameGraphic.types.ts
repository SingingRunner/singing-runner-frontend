import { RefObject } from "react";

export interface IGameGraphicUIProps {
  canvasRef: RefObject<HTMLDivElement>;
  reduceSnowmanHealth: () => void;
  switchPlayerToSnowman: (index: number) => void;
  switchSnowmanToPlayer: (index: number) => void;
  stopPlayer: (index: number) => void;
  startPlayer: (index: number) => void;
  movePlayer: (index: number, direction: "forward" | "backward") => void;
}
