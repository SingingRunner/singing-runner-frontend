import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface ICustomInviteUIProps {
  onClickInvite: (friendId: string) => void;
  data: Pick<IQuery, "searchFriend"> | undefined;
  keyword: string;
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
}
