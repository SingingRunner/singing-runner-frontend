import { Dispatch, SetStateAction } from "react";
import { buttonType } from "../../commons/button/Button";

export interface IReplayUIProps {
  isMyReplay: boolean;
  btnType: buttonType;
  setBtnType: Dispatch<SetStateAction<buttonType>>;
  playReplay: (replayId: number) => void;
  setPublic: (replayId: number, isPublic: boolean) => void;
  onLoadMore: () => void;
  goPrevPage: () => void;
  data: any;
}
