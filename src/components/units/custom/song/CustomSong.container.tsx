import { useQuery } from "@apollo/client";
import CustomSongUI from "./CustomSong.presenter";
import { useRecoilState } from "recoil";
import { roomInfoState, userIdState } from "../../../../commons/store";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { SEARCH_SONG_QUERY } from "./CustomSong.queries";
import {
  IQuery,
  IQuerySearchSongArgs,
} from "../../../../commons/types/generated/types";
import debounce from "lodash/debounce";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import { useRouter } from "next/router";
import { useCustomRoomInfo } from "../../../../commons/hooks/useCustomRoomInfo";

export default function CustomSong() {
  const router = useRouter();

  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [userId] = useRecoilState(userIdState);
  const [roomInfo] = useRecoilState(roomInfoState);
  const [filter, setFilter] = useState("createdAt");
  const [keyword, setKeyword] = useState("");

  useCustomRoomInfo();

  const { loading, data, refetch, fetchMore } = useQuery<
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
    refetch({ filter: newFilter, page: 1, keyword });
  };

  const onChangeSong = (songId: string) => {
    // 노래가 변경되었으면 emit (roomInfo 변경은 on에서 처리)
    if (roomInfo.songId !== songId)
      socket?.emit("set_song", { songId, userId });
    router.push("/custom");
  };

  const getDebounce = useCallback(
    debounce((data) => {
      refetch({ keyword: data.trim() });
    }, 200),
    [refetch]
  );

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    getDebounce(e.target.value);
  };

  const onLoadMore = () => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.searchSong.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.searchSong === undefined)
          return { searchSong: [...prev.searchSong] };
        return {
          searchSong: [...prev.searchSong, ...fetchMoreResult?.searchSong],
        };
      },
    });
  };

  return (
    <CustomSongUI
      loading={loading}
      data={data}
      keyword={keyword}
      filter={filter}
      onClickFilter={onClickFilter}
      onChangeKeyword={onChangeKeyword}
      onLoadMore={onLoadMore}
      onChangeSong={onChangeSong}
    />
  );
}
