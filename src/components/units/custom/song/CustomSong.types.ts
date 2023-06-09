import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface ICustomSongUIProps {
  filter: string;
  onClickFilter: () => void;
  onChangeSong: (song: string) => void;
  loading: boolean;
  data: Pick<IQuery, "searchSong"> | undefined;
  keyword: string;
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  onLoadMore: () => void;
}
