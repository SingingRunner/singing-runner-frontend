import { useRecoilState } from "recoil";
import ReplayUI from "./Replay.presenter";
import { userIdState } from "../../../commons/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { buttonType } from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";
import { gql, useMutation, useQuery } from "@apollo/client";

const FETCH_REPLAYS = gql`
  query FetchReplays($userId: String!, $page: Int, $isMyReplay: Boolean) {
    fetchReplays(userId: $userId, page: $page, isMyReplay: $isMyReplay) {
      replayId
      songTitle
      singer
      createdAt
      isPublic
    }
  }
`;

const UPDATE_PUBLIC = gql`
  mutation UpdateReplayPublic($replayId: Int!, $isPublic: Int!) {
    updateReplayPublic(replayId: $replayId, isPublic: $isPublic) {
      replayId
      isPublic
    }
  }
`;

export default function Replay() {
  const router = useRouter();
  const [isMyReplay, setIsMyReplay] = useState(false);
  const { data, fetchMore, refetch } = useQuery(FETCH_REPLAYS);
  const [currentUserId, setCurrentUserId] = useRecoilState(userIdState);
  const [updatePublic] = useMutation(UPDATE_PUBLIC);
  const [btnType, setBtnType] = useState(buttonType.SHORT_PINK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReplay, setCurrentReplay] = useState(0);

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("userId") || "");
    setIsMyReplay(currentUserId === router.query.userId);
  }, []);

  const onLoadMore = (): void => {
    console.log("onLoadMore");
    void fetchMore({
      variables: {
        userId: currentUserId,
        page: Math.ceil(data?.fetchReplays.length ?? 10 / 10) + 1,
        isMyReplay: isMyReplay,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchReplays === undefined)
          return { fetchReplays: [...prev.fetchReplays] };
        return {
          fetchReplays: [...prev.fetchReplays, ...fetchMoreResult.fetchReplays],
        };
      },
    });
  };

  const playReplay = (replayId: number) => {
    console.log("hello");
    router.push(`/replay/ingame/${replayId}`);
  };

  const setPublic = (replayId: number, isPublic: boolean) => {
    console.log("hello");
    if (!isPublic) {
      setCurrentReplay(replayId);
      setIsModalOpen(true);
    } else {
      console.log("?");
      updatePublic({
        variables: {
          replayId: currentReplay,
          isPublic: 1,
        },
      });
      refetch();
    }
  };

  const cancelChange = () => {
    setIsModalOpen(false);
  };

  const changeToPublic = () => {
    console.log(currentReplay);
    updatePublic({
      variables: {
        replayId: currentReplay,
        isPublic: 1,
      },
    });
    refetch();
    setIsModalOpen(false);
  };

  const goPrevPage = () => {
    router.back();
  };

  return (
    <>
      <ReplayUI
        isMyReplay={isMyReplay}
        btnType={btnType}
        setBtnType={setBtnType}
        playReplay={playReplay}
        setPublic={setPublic}
        onLoadMore={onLoadMore}
        data={data}
        goPrevPage={goPrevPage}
      />
      {isModalOpen ? (
        <Modal
          isCheck={true}
          firstText="선택한 플레이 기록을"
          secondText="공개하시겠어요?"
          buttonText="확인"
          leftButtonText="취소"
          onClickRight={changeToPublic}
          onClickLeft={cancelChange}
        />
      ) : null}
    </>
  );
}
