import { useRecoilState } from "recoil";
import ReplayUI from "./Replay.presenter";
import { userIdState } from "../../../commons/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { buttonType } from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryGetUserReplaysArgs,
} from "../../../commons/types/generated/types";

const GET_USER_REPLAYS = gql`
  query GetUserReplays(
    $userId: String!
    $pageNumber: Int!
    $isMyReplay: Boolean!
  ) {
    getUserReplays(
      userId: $userId
      pageNumber: $pageNumber
      isMyReplay: $isMyReplay
    ) {
      replayId
      songTitle
      singer
      createdAt
      isPublic
    }
  }
`;

const UPDATE_PUBLIC = gql`
  mutation UpdateReplayIsPublic($replayId: Int!, $isPublic: Int!) {
    updateReplayIsPublic(replayId: $replayId, isPublic: $isPublic) {
      replayId
      isPublic
    }
  }
`;

export default function Replay() {
  const router = useRouter();
  const [isMyReplay, setIsMyReplay] = useState(true);
  const [currentUserId, setCurrentUserId] = useRecoilState(userIdState);
  const [updatePublic] = useMutation(UPDATE_PUBLIC);
  const [btnType, setBtnType] = useState(buttonType.SHORT_PINK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReplay, setCurrentReplay] = useState(0);
  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "getUserReplays">,
    IQueryGetUserReplaysArgs
  >(GET_USER_REPLAYS, {
    variables: {
      isMyReplay: isMyReplay,
      pageNumber: 1,
      userId: currentUserId,
    },
  });

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("userId") || "");
    setIsMyReplay(currentUserId !== router.query.userId);
  }, []);

  const onLoadMore = (): void => {
    if (data === undefined) return;
    console.log("onLoadMore");
    void fetchMore({
      variables: {
        pageNumber: Math.ceil((data?.getUserReplays.length ?? 0) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getUserReplays === undefined) return prev;
        return {
          getUserReplays: [
            ...prev.getUserReplays,
            ...fetchMoreResult.getUserReplays,
          ],
        };
      },
    });
  };

  const playReplay = (replayId: number) => {
    console.log("hello");
    console.log("replayId", replayId);
    router.push(`/replay/ingame/${replayId}`);
  };

  const setPublic = (replayId: number, isPublic: boolean) => {
    console.log("hello");
    console.log("replayId", replayId, "isPublic", isPublic);
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
