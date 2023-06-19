import styled from "@emotion/styled";
import { memo, useEffect, useState, useRef } from "react";

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
  currentTime: number;
}

function Lyric(props: ILyricProps) {
  const [lyricIdx, setLyricIdx] = useState(0);
  const endLyric = useRef(data[0].timeStamp);

  useEffect(() => {
    const { startTime, currentTime } = props;
    const diff = Math.floor((currentTime - startTime) / 100) * 100;
    if (diff >= endLyric.current && lyricIdx < data.length - 1) {
      endLyric.current = data[lyricIdx + 1].timeStamp;
      setLyricIdx((prev) => prev + 1);
    }
  }, [props]);

  return (
    <LyricWrapper>
      {/* ⭐️ 탈주 메시지 */}
      {/* <DisconnectMsg>겁쟁이 “머기조”님이 탈주했습니다!</DisconnectMsg> */}
      <TextWrapper>
        <Text key={lyricIdx}>{data[lyricIdx].lyrics}</Text>
        {lyricIdx < data.length - 1 ? (
          <Text key={lyricIdx + 1}>{data[lyricIdx + 1].lyrics}</Text>
        ) : (
          <></>
        )}
        {/* {data.map((item, i) => (
          <Text key={i}>{item.lyrics}</Text>
        ))} */}
      </TextWrapper>
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
  padding: 20px 0;
  width: calc(100% - 32px);
  height: 112px;
  background: rgba(26, 17, 40, 0.74);
  border: 1px solid #f5caf2;
  box-shadow: 0px 0px 7px #f5caf2;
  border-radius: 7px;
`;

// ⭐️ 탈주 메시지
// const DisconnectMsg = styled.p`
//   position: absolute;
//   top: 12px;
//   font-size: 12px;
//   line-height: 14px;
//   text-align: center;
//   color: #c70707;
//   text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
// `;

const TextWrapper = styled.div`
  overflow: scroll;
  height: 70%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
`;
