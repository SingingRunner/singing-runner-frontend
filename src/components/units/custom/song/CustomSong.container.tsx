import { useQuery } from "@apollo/client";
import CustomSongUI from "./CustomSong.presenter";
// import { useRecoilState } from "recoil";
// import { roomInfoState } from "../../../../commons/store";
import { ChangeEvent, useCallback, useState } from "react";
import { SEARCH_SONG_QUERY } from "./CustomSong.queries";
import {
  IQuery,
  IQuerySearchSongArgs,
} from "../../../../commons/types/generated/types";
import _ from "lodash";

export default function CustomSong() {
  // const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [filter, setFilter] = useState("createdAt");
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "searchSong">,
    IQuerySearchSongArgs
  >(SEARCH_SONG_QUERY, {
    variables: {
      keyword: "",
      page: 1,
      filter,
    },
  });

  const onClickFilter = () => {
    let newFilter: string;
    switch (filter) {
      case "createdAt":
        setFilter("songTitle");
        newFilter = "songTitle";
        break;
      case "songTitle":
        setFilter("singer");
        newFilter = "singer";
        break;
      default:
        setFilter("createdAt");
        newFilter = "createdAt";
        break;
    }
    refetch({ filter: newFilter });
  };

  const onClickSong = (song: string) => {};

  const getDebounce = useCallback(
    _.debounce((data) => {
      refetch({ keyword: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    getDebounce(e.target.value);
  };

  return (
    <CustomSongUI
      filter={filter}
      onClickFilter={onClickFilter}
      onClickSong={onClickSong}
      data={data}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    />
  );
}
