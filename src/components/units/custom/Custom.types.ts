import { Dispatch, SetStateAction } from "react";

export interface ICustomUIProps {
  roomInfo: IRoomInfoState;
  onClickExit: () => void;
  onClickMode: () => void;
  onClickGameStart: () => void;
  isSongModalOpen: boolean;
  setIsSongModalOpen: Dispatch<SetStateAction<boolean>>;
  isPrevModalOpen: boolean;
  setIsPrevModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IRoomInfoState {
  rival1?: {
    userId: string;
    character: string;
    tier: string;
    isFriend?: boolean;
  };
  rival2?: {
    userId: string;
    character: string;
    tier: string;
    isFriend?: boolean;
  };
  mode: string;
  singer: string;
  songTitle: string;
}
