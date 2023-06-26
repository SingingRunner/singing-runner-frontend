import Draggable from "react-draggable";
import styled from "@emotion/styled";
import { memo, useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";
import { ILyricProps } from "./Lyric.types";

const data = [
  { timeStamp: 4500, lyrics: "나비처럼 날아가 볼까" },
  { timeStamp: 7800, lyrics: "일렁거리는 바람에 실려" },
  { timeStamp: 10000, lyrics: "이런 느낌을" },
  { timeStamp: 11800, lyrics: "언제나 느낄 수 있을까" },
  { timeStamp: 16800, lyrics: "마음속을 좁혀오는" },
  { timeStamp: 18800, lyrics: "사소한 일은 신경 쓰지 마" },
  { timeStamp: 21800, lyrics: "지금 이대로" },
  { timeStamp: 23000, lyrics: "날아가 모두 잊으면 돼" },
  { timeStamp: 27800, lyrics: "어떻게 wow wow" },
  { timeStamp: 28800, lyrics: "wow wow wow" },
  { timeStamp: 30800, lyrics: "하늘 끝까지 닿을 수 있을까" },
  { timeStamp: 33800, lyrics: "이렇게 wow wow" },
  { timeStamp: 34800, lyrics: "wow wow wow" },
  { timeStamp: 36700, lyrics: "여린 날개가" },
  { timeStamp: 37700, lyrics: "힘을 낼 수 있을까" },
  { timeStamp: 42800, lyrics: "그래 그리 쉽지는 않겠지" },
  { timeStamp: 46800, lyrics: "나를 허락해준 세상이란" },
  { timeStamp: 48800, lyrics: "손쉽게 다가오는" },
  { timeStamp: 50800, lyrics: "편하고도 감미로운 공간이 아냐" },
  { timeStamp: 54800, lyrics: "그래도 날아오를 거야" },
  { timeStamp: 58800, lyrics: "작은 날갯짓에 꿈을 담아" },
  { timeStamp: 60800, lyrics: "조금만 기다려봐 oh my love" },
  { timeStamp: -1, lyrics: "끝 !" },
];

function Lyric(props: ILyricProps) {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [lyricIdx, setLyricIdx] = useState(0);
  const endLyric = useRef(data[0].endTime);
  const lyricRef = useRef(0);

  useEffect(() => {
    if (props.startTime !== 0) {
      console.log(props.startTime);
      let cnt = 0;
      const changeLyric = () => {
        if (cnt++ % 3 === 0) {
          const currentTime = new Date().getTime();
          const diff = Math.floor((currentTime - props.startTime) / 100) * 100;
          if (diff >= endLyric.current && lyricRef.current < data.length - 1) {
            endLyric.current = props.lyrics[lyricRef.current + 1].endTime;
            setLyricIdx((prev) => prev + 1);
            lyricRef.current++;
          }
        }
        requestAnimationFrame(changeLyric);
      };
      changeLyric();
    }
  }, [props.startTime]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setPosition((prevPosition) => {
          const xMove =
            prevPosition.x + 5 > 50
              ? -(prevPosition.x + 5)
              : prevPosition.x + 5;
          const yMove =
            prevPosition.y + 5 > 15
              ? -(prevPosition.y + 5)
              : prevPosition.y + 5;
          return { x: xMove, y: yMove };
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isDragging]);

  // Drag 시작하면 자동 이동을 멈춤
  const onStart = () => {
    setDragging(true);
  };

  // Drag 끝나면 자동 이동을 다시 시작
  const onStop = () => {
    setDragging(false);
  };

  const [exit, setExit] = useState("");
  useEffect(() => {
    socket?.on("exit", (data: { userId: string; nickname: string }) => {
      setExit(data.nickname);
    });
  }, [socket]);
  return (
    <LyricWrapper>
      {exit && <DisconnectMsg>겁쟁이 “{exit}”님이 탈주했습니다!</DisconnectMsg>}
      <Text key={lyricIdx}>{props.lyrics[lyricIdx].lyric}</Text>
      {lyricIdx < props.lyrics.length - 1 ? (
        <Text key={lyricIdx + 1}>{props.lyrics[lyricIdx + 1].lyric}</Text>
      ) : (
        <></>
      )}
      {props.isCloud && (
        <Draggable
          bounds="parent"
          onStart={onStart}
          onStop={onStop}
          position={position}
        >
          <Cloud src="/game/item/effect/draggable_cloud.png" />
        </Draggable>
      )}
    </LyricWrapper>
  );
}
export default memo(Lyric);

const LyricWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 16px;
  width: calc(100% - 32px);
  height: 112px;
  background: rgba(26, 17, 40, 0.74);
  border: 1px solid #f5caf2;
  box-shadow: 0px 0px 7px #f5caf2;
  border-radius: 7px;
`;

const DisconnectMsg = styled.p`
  position: absolute;
  top: 12px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #c70707;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
`;

const Cloud = styled.img`
  position: absolute;
  height: 80px;
`;
