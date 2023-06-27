import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface ICustomInviteUIProps {
  onClickInvite: (friendId: string) => void;
  loading: boolean;
  data: Pick<IQuery, "searchFriend"> | undefined;
  keyword: string;
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  isLimitCountModalOpen: boolean;
  setIsLimitCountModalOpen: Dispatch<SetStateAction<boolean>>;
  onLoadMore: () => void;
}
