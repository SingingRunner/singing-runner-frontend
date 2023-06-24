import Draggable from "react-draggable";
import styled from "@emotion/styled";
import { memo, useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../../../commons/contexts/SocketContext";

const data = [
  { timeStamp: 4500, lyrics: "하나, 둘, 셋, 야!" },
  { timeStamp: 7500, lyrics: "천방지축 어리둥절 빙글빙글" },
  { timeStamp: 10200, lyrics: "돌아가는 짱구의 하루" },
  { timeStamp: 15100, lyrics: "우리의 짱구는 정말 못 말려" },
  { timeStamp: 17000, lyrics: '"짱구야~"' },
  { timeStamp: 22200, lyrics: "짓궂은 장난은 나에게 맡기세요" },
  { timeStamp: 28200, lyrics: "이 세상 누구보다 자신이 있다고요" },
  { timeStamp: 32000, lyrics: "이리 모여~ 모두 모여~" },
  { timeStamp: 34000, lyrics: "양파를 먹어보렴" },
  { timeStamp: 38200, lyrics: "그런 눈으로 바라보면 부끄럽죠" },
  { timeStamp: 40800, lyrics: "엄~마~ 아~빠~" },
  { timeStamp: 42900, lyrics: "나는 인기만점!" },
  { timeStamp: 43200, lyrics: '"짱구야!!"' },
  { timeStamp: 46000, lyrics: "천방지축 어리둥절 빙글빙글" },
  { timeStamp: 48800, lyrics: "모두가 정신이 없네" },
  { timeStamp: 52000, lyrics: "짱구는 대단하네 짱구는 천재라네" },
  { timeStamp: -1, lyrics: "다음엔 무엇을 할까" },
];

interface ILyricProps {
  startTime: number;
  isCloud: boolean;
}

function Lyric(props: ILyricProps) {
  // 소켓 가져오기
  const socketContext = useContext(SocketContext);
  if (!socketContext) return <div>Loading...</div>;
  const { socket } = socketContext;

  const [lyricIdx, setLyricIdx] = useState(0);
  const endLyric = useRef(data[0].timeStamp);
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
            endLyric.current = data[lyricRef.current + 1].timeStamp;
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
      <Text key={lyricIdx}>{data[lyricIdx].lyrics}</Text>
      {lyricIdx < data.length - 1 ? (
        <Text key={lyricIdx + 1}>{data[lyricIdx + 1].lyrics}</Text>
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
