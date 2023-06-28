// Game.container.tsx
import { useContext, useEffect, useState } from "react";
import GameUI from "./Game.presenter";
import Sound from "./sound/Sound";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRecoilState } from "recoil";
import {
  gameResultState,
  roomInfoState,
  userIdState,
} from "../../../commons/store";
import { IGameProps, IPlayersInfo, ISocketItem } from "./Game.types";
import { ITEM_DURATION } from "./itemInfo/ItemInfo.styles";
import { IGameResult } from "./result/GameResult.types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Button, { buttonType } from "../../commons/button/Button";
import {
  IQuery,
  IQueryFetchUserArgs,
} from "../../../commons/types/generated/types";
import { FETCH_USER, UPLOAD_FILE } from "./Game.queries";
import { ILyric } from "./lyric/Lyric.types";

const UNMUTE_DECIBEL = -75; // mute 아이템을 해제시키는 데시벨 크기

export default function Game(props: IGameProps) {
  const [userId] = useRecoilState(userIdState);
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId") || "");
  // }, []);
  const { data } = useQuery<Pick<IQuery, "fetchUser">, IQueryFetchUserArgs>(
    FETCH_USER,
    { variables: { userId } }
  );

  const router = useRouter();

  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket, socketDisconnect } = socketContext;

  // 로딩 화면을 관리하는 상태
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // 게임 종료 여부
  const [isTerminated, setIsTerminated] = useState(false);
  const [isUserExit, setIsUserExit] = useState(false);

  const [songInfo, setSongInfo] = useState({ title: "", singer: "" });
  const [lyrics, setLyrics] = useState<ILyric[]>([]);

  const [base64data, setBase64Data] = useState("");

  // 전체 유저의 정보
  const [playersInfo, setPlayersInfo] = useState<IPlayersInfo[]>([]);

  // ⭐️ 현재의 mrKey를 저장하는 상태 -> 현재 유저의 기본 설정값으로 초기화
  const [mrKey, setMrKey] = useState("origin");
  useEffect(() => {
    setMrKey(
      data?.fetchUser.userKeynote === 0
        ? "origin"
        : data?.fetchUser.userKeynote === 2
        ? "male"
        : "female"
    );
  }, [data]);

  // mute 아이템 발동 시 측정한 데시벨의 상태
  const [decibel, setDecibel] = useState(0);
  // mute 공격을 당한 경우, 데시벨 측정 시작을 위한 상태
  const [isMuteActive, setIsMuteActive] = useState(false);
  // frozen 공격을 당한 경우, 캐릭터를 눈사람으로 만들기 위한 상태
  const [isFrozenActive, setIsFrozenActive] = useState(false);
  const [isFrozenActiveRight, setIsFrozenActiveRight] = useState(false);
  const [isFrozenActiveLeft, setIsFrozenActiveLeft] = useState(false);
  // 현재 유저에게 활성화된 아이템을 관리하는 상태
  const [appliedItems, setAppliedItems] = useState<string[]>([]);

  const [, setGameResult] = useRecoilState(gameResultState);

  const [muteAttack, setMuteAttack] = useState({
    mid: false,
    right: false,
    left: false,
  });
  const [, setRoomInfo] = useRecoilState(roomInfoState);

  useEffect(() => {
    // 다른 유저로부터 공격이 들어옴
    socket?.on("use_item", (data: ISocketItem) => {
      if (data.userId !== userId) onItem(data.item);
      else if (
        data.userId === userId &&
        ["keyUp", "keyDown"].includes(data.item)
      )
        onItem(data.item);

      setPlayersInfo((prev) => {
        const temp = [...prev];
        temp.forEach((user, i) => {
          // frozen | mute | cloud -> 공격자 빼고 적용
          if (["mute", "cloud", "frozen"].includes(data.item)) {
            if (user.userId !== data.userId) {
              temp[i].activeItem = data.item;
              if (data.item === "mute")
                setMuteAttack((prev) => ({ ...prev, [user.position]: true }));
              if (data.item === "frozen") {
                if (user.position === "right") setIsFrozenActiveRight(true);
                else if (user.position === "left") setIsFrozenActiveLeft(true);
              }
            }
            // 공격자가 현재 유저가 아닌 경우 화면에 적용
          }
          // keyUp | keyDown -> 모두 적용
          else {
            temp[i].activeItem = data.item;
          }
        });
        return temp;
      });
    });

    // 아이템에서 탈출
    socket?.on("escape_item", (data: ISocketItem) => {
      // 탈출한 유저가 현재 유저인 경우
      if (data.userId === userId) {
        offItem(data.item);
      }
      setPlayersInfo((prev) => {
        const temp = [...prev];
        temp.forEach((user, i) => {
          if (user.userId === data.userId) {
            temp[i].activeItem = "";
            if (data.item === "mute")
              setMuteAttack((prev) => ({ ...prev, [user.position]: false }));
            if (data.item === "frozen") {
              if (user.position === "right") setIsFrozenActiveRight(false);
              else if (user.position === "left") setIsFrozenActiveLeft(false);
            }
          }
        });
        return temp;
      });
    });

    // 게임 종료 후 모든 유저의 점수 전달 받기 & 게임 종료 버튼 노출
    socket?.on("game_terminated", (data: IGameResult[]) => {
      setGameResult(data);
      setIsTerminated(true);
      setRoomInfo((prev) => ({
        ...prev,
        songTitle: "",
        playerCount: 0,
        players: [],
      }));
    });
  }, [socket]);

  useEffect(() => {
    if (isTerminated && base64data) {
      const result = uploadFile({
        variables: {
          userVocal: base64data,
          userId,
        },
      });
      result.then(() => {});
    }
  }, [base64data, isTerminated]);

  /** 현재 유저 화면에 아이템 효과를 시작하는 함수 */
  const onItem = (item: string) => {
    setAppliedItems((prev) => [...prev, item]);

    // 키 변경 | 음소거
    // frozen은 별도 함수에서 적용
    if (item === "keyUp") setMrKey("keyUp");
    else if (item === "keyDown") setMrKey("keyDown");
    else if (item === "mute") setIsMuteActive(true);
    else if (item === "frozen") setIsFrozenActive(true);

    // 아이템 효과 종료 처리
    // frozen 아이템은 유저가 직접 종료
    if (item === "frozen") return;
    // 나머지 아이템은 ITEM_DURATION 뒤에 자동 종료
    setTimeout(() => {
      if (props.preventEvent) return;
      socket?.emit("escape_item", { item, userId });
    }, ITEM_DURATION);
  };

  /** 현재 유저의 아이템 효과를 종료하는 함수 */
  const offItem = (item: string) => {
    setAppliedItems((prev) => {
      const temp = [...prev];
      // 처음으로 일치하는 요소 삭제
      const index = temp.findIndex((i) => i === item);
      // 🚨 눈사람은 탈출하면 모두 제거
      if (item === "frozen") return temp.filter((el) => el !== "frozen");
      if (index !== -1) temp.splice(index, 1);
      return temp;
    });
    if (item === "keyUp" || item === "keyDown") setMrKey("origin");
    else if (item === "frozen") setIsFrozenActive(false);
  };

  /** 데시벨을 측정하는 함수 */
  const checkDecibel = () => {
    if (props.preventEvent) return;
    if (isMuteActive && decibel !== 0 && decibel > UNMUTE_DECIBEL) {
      console.log("현재 데시벨: ", decibel, UNMUTE_DECIBEL, "넘어야 함");
      setIsMuteActive(false);
      socket?.emit("escape_item", { item: "mute", userId });
    }
  };

  useEffect(() => {
    if (isMuteActive) checkDecibel();
  }, [isMuteActive, decibel]);

  return (
    <>
      <GameUI
        preventEvent={props.preventEvent}
        songInfo={songInfo}
        playersInfo={playersInfo}
        decibel={decibel}
        appliedItems={appliedItems}
        offItem={offItem}
        isLoadComplete={isLoadComplete}
        progress={progress}
        startTime={startTime}
        muteAttack={muteAttack}
        isFrozenActive={isFrozenActive}
        isFrozenActiveRight={isFrozenActiveRight}
        isFrozenActiveLeft={isFrozenActiveLeft}
        isTerminated={isTerminated}
        lyrics={lyrics}
      />
      <Sound
        preventEvent={props.preventEvent}
        setSongInfo={setSongInfo}
        mrKey={mrKey}
        setDecibel={setDecibel}
        setPlayersInfo={setPlayersInfo}
        appliedItems={appliedItems}
        isLoadComplete={isLoadComplete}
        setIsLoadComplete={setIsLoadComplete}
        progress={progress}
        setProgress={setProgress}
        setStartTime={setStartTime}
        isTerminated={isTerminated}
        setIsTerminated={setIsTerminated}
        isReplay={props.isReplay}
        setBase64Data={setBase64Data}
        setLyrics={setLyrics}
        isUserExit={isUserExit}
      />
      {props.isReplay ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            buttonType={buttonType.GRADATION}
            text="나가기"
            isFixedAtBottom
            onClick={() => {
              // 🚨 인게임 퇴장 시 이벤트 추가
              setIsUserExit(true);
              socketDisconnect();
              router.back();
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
