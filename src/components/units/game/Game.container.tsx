// Game.container.tsx
import { useContext, useEffect, useState } from "react";
import GameUI from "./Game.presenter";
import Sound from "./sound/Sound";
import { SocketContext } from "../../../commons/contexts/SocketContext";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  gameResultState,
  roomInfoState,
  userIdState,
} from "../../../commons/store";
import { IGameProps, IPlayersInfo, ISocketItem } from "./Game.types";
import { ITEM_DURATION } from "./itemInfo/ItemInfo.styles";
import { IGameResult } from "./result/GameResult.types";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Button, { buttonType } from "../../commons/button/Button";
import { UPLOAD_FILE } from "./Game.queries";
import { ILyric } from "./lyric/Lyric.types";
import { PollingContext } from "../../../commons/contexts/PollingContext";

/** mute 아이템을 해제시키는 데시벨 크기 */
export const UNMUTE_DECIBEL = -68;

export default function Game(props: IGameProps) {
  const [userId] = useRecoilState(userIdState);
  /** 플레이어: 인게임인 경우 현재 유저, 리플레이인 경우 해당 리플레이의 유저 */
  const [playerId] = useState(props.playerId || userId);

  const router = useRouter();

  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket, socketDisconnect } = socketContext;

  const pollingContext = useContext(PollingContext);
  if (!pollingContext) return <div>Loading...</div>;
  const { setIsPolling } = pollingContext;

  const [roomInfo] = useRecoilState(roomInfoState);
  const resetRoomInfoState = useResetRecoilState(roomInfoState);

  const [preventEvent, setPreventEvent] = useState(false);
  useEffect(() => {
    if (roomInfo.mode === "일반" || props.isReplay) setPreventEvent(true);
  }, [roomInfo]);

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

  const [superTime, setSuperTime] = useState({
    mid: false,
    right: false,
    left: false,
  });

  useEffect(() => {
    // 다른 유저가 아이템을 시전
    socket?.on("use_item", (data: ISocketItem) => {
      // 내가 시전한 게 아니고, super가 아닌 경우 -> 나에게 적용
      if (data.userId !== playerId && data.item !== "super") {
        // 슈퍼 타임에 cloud | frozen | mute를 당한 경우 -> 무시
        setSuperTime((superPrev) => {
          if (
            !(superPrev.mid && ["cloud", "frozen", "mute"].includes(data.item))
          )
            onItem(data.item);
          return superPrev;
        });
      }

      // 내가 시전한 경우 -> keyUp, keyDown, super만 적용
      else if (
        data.userId === playerId &&
        ["keyUp", "keyDown", "super"].includes(data.item)
      )
        onItem(data.item);

      setPlayersInfo((prev) => {
        const temp = [...prev];
        temp.forEach((user, i) => {
          /* frozen | mute | cloud */
          if (["mute", "cloud", "frozen"].includes(data.item)) {
            setSuperTime((superPrev) => {
              // 시전자가 아니고 && 슈퍼타임이 아닌 유저에게만 적용
              if (user.userId !== data.userId && !superPrev[user.position]) {
                temp[i].activeItem = data.item;
                if (data.item === "mute") {
                  setMuteAttack((prev) => ({ ...prev, [user.position]: true }));
                } else if (data.item === "frozen") {
                  if (user.position === "right") setIsFrozenActiveRight(true);
                  else if (user.position === "left")
                    setIsFrozenActiveLeft(true);
                }
              }
              return superPrev;
            });

            /* super */
          } else if (data.item === "super") {
            // 시전자만 적용
            if (user.userId === data.userId) {
              temp[i].activeItem = data.item;
              if (user.position === "right") {
                setSuperTime((prev) => ({
                  ...prev,
                  [user.position]: true,
                }));
                setIsFrozenActiveRight(false);
                setMuteAttack((prev) => ({
                  ...prev,
                  [user.position]: false,
                }));
              } else if (user.position === "left") {
                setSuperTime((prev) => ({
                  ...prev,
                  [user.position]: true,
                }));
                setIsFrozenActiveLeft(false);
                setMuteAttack((prev) => ({
                  ...prev,
                  [user.position]: false,
                }));
              }
            }
          }
          /* keyUp | keyDown */
          // 모두 적용
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
      if (data.userId === playerId) {
        offItem(data.item);
      }
      setPlayersInfo((prev) => {
        const temp = [...prev];
        temp.forEach((user, i) => {
          if (user.userId === data.userId) {
            temp[i].activeItem = "";
            if (data.item === "super")
              setSuperTime((prev) => ({ ...prev, [user.position]: false }));
            if (data.item === "mute")
              setMuteAttack((prev) => ({ ...prev, [user.position]: false }));
            if (data.item === "frozen") {
              if (user.position === "right") setIsFrozenActiveRight(false);
              else if (user.position === "left") setIsFrozenActiveLeft(false);
              else setIsFrozenActive(false);
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
      resetRoomInfoState();
    });
  }, [socket]);

  useEffect(() => {
    if (isTerminated && base64data) {
      uploadFile({
        variables: {
          userVocal: base64data,
          userId,
        },
      });
    }
  }, [base64data, isTerminated]);

  /** 현재 유저 화면에 아이템 효과를 시작하는 함수 */
  const onItem = (item: string) => {
    setAppliedItems((prev) => [...prev, item]);

    if (item === "keyUp") setMrKey("keyUp");
    else if (item === "keyDown") setMrKey("keyDown");
    else if (item === "mute") setIsMuteActive(true);
    else if (item === "frozen") setIsFrozenActive(true);
    else if (item === "super") {
      setAppliedItems(["super"]); // super 이외의 모든 아이템 해제
      setSuperTime((prev) => ({
        ...prev,
        mid: true,
      }));
      setIsFrozenActive(false);
      setMuteAttack((prev) => ({
        ...prev,
        mid: false,
      }));
      // 슈퍼 타임에는 음소거/눈사람 종료
      appliedItems.forEach((el) => {
        if (["mute", "frozen"].includes(el)) {
          offItem(el);
          socket?.emit("escape_item", { item: el, userId });
          if (el === "mute") setDecibel(0);
        }
      });
    }

    // 아이템 효과 종료 처리
    // frozen 아이템은 유저가 직접 종료
    if (item === "frozen") return;
    // 나머지 아이템은 ITEM_DURATION 뒤에 자동 종료
    setTimeout(() => {
      if (preventEvent) return;
      if (superTime.mid && item !== "super") return;
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
    else if (item === "mute") {
      setIsMuteActive(false);
      setDecibel(0);
    }
  };

  /** 데시벨을 측정하는 함수 */
  const checkDecibel = () => {
    console.log("현재 데시벨: ", decibel, UNMUTE_DECIBEL, "넘어야 함");
    if (preventEvent) return;
    if (isMuteActive && decibel !== 0 && decibel > UNMUTE_DECIBEL) {
      setIsMuteActive(false);
      setDecibel(0);
      socket?.emit("escape_item", { item: "mute", userId });
    }
  };

  useEffect(() => {
    if (isMuteActive) checkDecibel();
  }, [isMuteActive, decibel]);

  return (
    <>
      <GameUI
        playerId={props.playerId}
        preventEvent={preventEvent}
        songInfo={songInfo}
        playersInfo={playersInfo}
        decibel={decibel}
        appliedItems={appliedItems}
        offItem={offItem}
        isLoadComplete={isLoadComplete}
        progress={progress}
        startTime={startTime}
        muteAttack={muteAttack}
        superTime={superTime}
        isFrozenActive={isFrozenActive}
        isFrozenActiveRight={isFrozenActiveRight}
        isFrozenActiveLeft={isFrozenActiveLeft}
        isTerminated={isTerminated}
        lyrics={lyrics}
      />
      <Sound
        preventEvent={preventEvent}
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
              setIsUserExit(true);
              socketDisconnect();
              setIsPolling(true);
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
