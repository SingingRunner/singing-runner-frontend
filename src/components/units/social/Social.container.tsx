import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { userIdState } from "../../../commons/store";
import {
  IQuery,
  IQuerySearchFriendArgs,
} from "../../../commons/types/generated/types";
import SocialUI from "./Social.presenter";
import { ISocialUIProps } from "./Social.types";

import { SEARCH_FRIEND } from "./Social.queries";
import { S3_PATH } from "../../../commons/constants/Constants";

export default function Social() {
  const [userId] = useRecoilState(userIdState);
  const [keyword, setKeyword] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  // 소셜 화면으로 이동해 왔을 때, 친구가 없다는 문구가 바로 뜨지 않게 하기 위한 state
  const [hasFetched, setHasFetched] = useState(false);
  // 검색어가 다 지워졌을 때 데이터가 로딩중이면 친구가 없다는 문구가 뜨지 않게 처리하는 state
  const [isLoadingAfterSearch, setIsLoadingAfterSearch] = useState(false);
  // 검색어가 변경될 때 상태 업데이트(검색어 다 지웠을 때 무한 스크롤 작동 안하는 문제 해결하기 위함)
  const [hasMore, setHasMore] = useState(true);

  const { loading, data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "searchFriend">,
    IQuerySearchFriendArgs
  >(SEARCH_FRIEND, {
    variables: {
      userId,
      nickname: "",
      page: 1,
    },
    fetchPolicy: "network-only",
    onCompleted: () => {
      setHasFetched(true);
    },
    onError: () => {
      setHasFetched(true);
    },
  });

  const onClickReplay = (friendId: string) => () => {
    try {
      router.push({
        pathname: `/replay/${friendId}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onLoadMore = async (): Promise<void> => {
    if (data === undefined) return;

    const result = await fetchMore({
      variables: {
        page: Math.ceil((data?.searchFriend.length ?? 0) / 10) + 1,
        nickname: keyword,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.searchFriend || !prev.searchFriend) {
          return prev;
        }
        const updatedData = {
          searchFriend: [...prev.searchFriend, ...fetchMoreResult.searchFriend],
        };
        return updatedData;
      },
    });

    // fetchmore가 끝나고 hasmore state 업데이트
    setHasMore(result?.data?.searchFriend.length % 10 === 0);
  };

  // 컴포넌트 마운트와 keyword 변경 이벤트에 대응할 콜백 함수
  const onInitialLoad = async () => {
    if (!data) return;

    const result = await fetchMore({
      variables: {
        page: Math.ceil((data?.searchFriend.length ?? 0) / 10) + 1,
        nickname: keyword,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.searchFriend || !prev.searchFriend) {
          return prev;
        }
        const updatedData = {
          searchFriend: [...prev.searchFriend, ...fetchMoreResult.searchFriend],
        };
        return updatedData;
      },
    });

    setHasMore(result?.data?.searchFriend.length % 10 === 0);
  };

  useEffect(() => {
    onInitialLoad();
  }, [keyword]);

  // 검색어와 데이터 쿼리 변경될 때마다 무한 스크롤의 작동 여부 업데이트
  useEffect(() => {
    if (!keyword) {
      setHasMore(true);
    } else {
      if (data?.searchFriend) {
        setHasMore(data.searchFriend.length % 10 === 0);
      } else {
        setHasMore(false);
      }
    }
  }, [keyword, data]);

  useEffect(() => {
    if (debounceValue.trim()) {
      setIsLoadingAfterSearch(true);
    } else {
      setIsLoadingAfterSearch(false);
    }

    const timer = setTimeout(() => {
      refetch({ nickname: debounceValue.trim() });
    }, 200);

    if (!debounceValue.trim()) {
      refetch({ nickname: "" });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [debounceValue, refetch]);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setDebounceValue(e.target.value);
  };

  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(`${S3_PATH}/sound/effect/popup.mp3`);
    audioRef.current = audio;
  }, []);

  const onClickAdd = () => {
    audioRef.current?.play();
    router.push("/social/add");
  };

  const onClickSetting = () => {
    audioRef.current?.play();
    router.push("/social/setting");
  };

  const onClickExit = () => {
    router.push("/main");
  };

  const props: ISocialUIProps = {
    hasMore,
    loading,
    isLoadingAfterSearch,
    hasFetched,
    data,
    keyword,
    onChangeNickname,
    onClickAdd,
    onClickExit,
    onClickReplay,
    onClickSetting,
    onLoadMore,
  };

  return <SocialUI {...props} />;
}
