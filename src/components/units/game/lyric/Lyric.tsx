import styled from "@emotion/styled";
import { memo } from "react";

const data = [
  { timeStamp: 0, lyrics: "하나, 둘, 셋, 야!" },
  { timeStamp: 1, lyrics: "천방지축 어리둥절 빙글빙글" },
  { timeStamp: 2, lyrics: "돌아가는 짱구의 하루" },
  { timeStamp: 3, lyrics: "우리의 짱구는 정말 못 말려" },
  { timeStamp: 4, lyrics: '"짱구야~"' },
  { timeStamp: 5, lyrics: "짓궂은 장난은 나에게 맡기세요" },
  { timeStamp: 6, lyrics: "이 세상 누구보다 자신이 있다고요" },
  { timeStamp: 7, lyrics: "이리 모여~ 모두 모여~" },
  { timeStamp: 8, lyrics: "양파를 먹어보렴" },
  { timeStamp: 9, lyrics: "그런 눈으로 바라보면 부끄럽죠" },
  { timeStamp: 10, lyrics: "엄~마~ 아~빠~" },
  { timeStamp: 11, lyrics: "나는 인기만점!" },
  { timeStamp: 12, lyrics: '"짱구야!!"' },
  { timeStamp: 13, lyrics: "천방지축 어리둥절 빙글빙글" },
  { timeStamp: 14, lyrics: "모두가 정신이 없네" },
  { timeStamp: 15, lyrics: "짱구는 대단하네 짱구는 천재라네" },
  { timeStamp: 16, lyrics: "다음엔 무엇을 할까" },
];

function Lyric() {
  return (
    <LyricWrapper>
      {/* ⭐️ 탈주 메시지 */}
      {/* <DisconnectMsg>겁쟁이 “머기조”님이 탈주했습니다!</DisconnectMsg> */}
      <TextWrapper>
        {data.map((item, i) => (
          <Text key={i}>{item.lyrics}</Text>
        ))}
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
