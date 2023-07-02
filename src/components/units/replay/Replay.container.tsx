import { useRecoilState } from "recoil";
import ReplayUI from "./Replay.presenter";
import { userIdState } from "../../../commons/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { buttonType } from "../../commons/button/Button";
import Modal from "../../commons/modal/Modal";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/client";
import {
  FETCH_USER_BY_USER_ID,
  GET_USER_REPLAYS,
  UPDATE_PUBLIC,
} from "./Replay.queries";
import {
  IQuery,
  IQueryGetUserReplaysArgs,
} from "../../../commons/types/generated/types";

export default function Replay() {
  const router = useRouter();
  const [isMyReplay, setIsMyReplay] = useState(true);
  const [currentUserId] = useRecoilState(userIdState);
  const [updatePublic] = useMutation(UPDATE_PUBLIC);
  const [btnType, setBtnType] = useState(buttonType.SHORT_PINK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReplay, setCurrentReplay] = useState(0);
  const [character, setCharacter] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");

  const { data: userData } = useQuery<Pick<IQuery, "fetchUserByUserId">>(
    FETCH_USER_BY_USER_ID,
    {
      variables: {
        userId: router.query.userId as string,
      },
      fetchPolicy: "network-only",
    }
  );

  const { data, fetchMore, refetch } = useQuery<
    Pick<IQuery, "getUserReplays">,
    IQueryGetUserReplaysArgs
  >(GET_USER_REPLAYS, {
    variables: {
      isMyReplay,
      pageNumber: 1,
      userId: router.query.userId as string,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (userData?.fetchUserByUserId) {
      setCharacter(userData?.fetchUserByUserId.character);
      setNickname(userData?.fetchUserByUserId.nickname);
      console.log(userData);
    }
  }, [userData, isMyReplay]);

  useEffect(() => {
    setUserId(router.query.userId as string);
  }, []);

  useEffect(() => {
    setIsMyReplay(currentUserId === router.query.userId);
    console.log("userId: ", userId, "current: ", currentUserId);
    console.log("character: ", character);
    console.log(character);
  }, [userId]);

  const convertTimeToUnit = (receivedAt: string) => {
    if (!receivedAt) {
      return "알 수 없음";
    }

    const receivedAtDate = moment(receivedAt).toDate();
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.valueOf() - receivedAtDate.valueOf()) / 1000
    ); // 초 단위 차이 계산

    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 60 * 60) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 60 * 60 * 24) {
      const hours = Math.floor(diffInSeconds / (60 * 60));
      return `${hours}시간 전`;
    } else if (diffInSeconds < 60 * 60 * 24 * 30) {
      const days = Math.floor(diffInSeconds / (60 * 60 * 24));
      return `${days}일 전`;
    } else if (diffInSeconds < 60 * 60 * 24 * 365) {
      const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
      return `${months}달 전`;
    } else {
      const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
      return `${years}년 전`;
    }
  };

  const onLoadMore = (): void => {
    if (data === undefined) return;
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
    router.push(`/replay/ingame/${userId}/${replayId}`);
  };

  const setPublic = async (replayId: number, isPublic: boolean) => {
    if (!isPublic) {
      setCurrentReplay(replayId);
      setIsModalOpen(true);
    } else {
      await updatePublic({
        variables: {
          replayId,
          isPublic: 0,
        },
      });
      refetch();
    }
  };

  const cancelChange = () => {
    setIsModalOpen(false);
  };

  const changeToPublic = async () => {
    console.log(currentReplay);
    await updatePublic({
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
        convertTimeToUnit={convertTimeToUnit}
        character={character}
        nickname={nickname}
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
