import styled from "@emotion/styled";

const data = [
  { timeStamp: 0, lyrics: "내 모습이 보이지 않아 앞길도 보이지 않아" },
  { timeStamp: 1, lyrics: "나는 아주 작은 애벌레" },
  { timeStamp: 2, lyrics: "살이 터져 허물 벗어 한 번 두 번 다시" },
  { timeStamp: 3, lyrics: "나는 상처 많은 번데기" },
  { timeStamp: 4, lyrics: "추운 겨울이 다가와 힘겨울지도 몰라" },
  { timeStamp: 5, lyrics: "봄바람이 불어오면 이제 나의 꿈을 찾아 날아" },
  { timeStamp: 6, lyrics: "날개를 활짝 펴고 세상을 자유롭게 날거야" },
  { timeStamp: 7, lyrics: "노래하며 춤추는 나는 아름다운 나비" },
  { timeStamp: 8, lyrics: "날개를 활짝 펴고 세상을 자유롭게 날거야" },
  { timeStamp: 9, lyrics: "노래하며 춤추는 나는 아름다운 나비" },
  { timeStamp: 10, lyrics: "거미줄을 피해 날아 꽃을 찾아 날아" },
  { timeStamp: 11, lyrics: "사마귀를 피해 날아 꽃을 찾아 날아" },
  { timeStamp: 12, lyrics: "꽃들의 사랑을 전하는 나비" },
  { timeStamp: 13, lyrics: "날개를 활짝 펴고 세상을 자유롭게 날거야" },
  { timeStamp: 14, lyrics: "노래하며 춤추는 나는 아름다운 나비" },
  { timeStamp: 15, lyrics: "날개를 활짝 펴고 세상을 자유롭게 날거야" },
  { timeStamp: 16, lyrics: "노래하며 춤추는 나는 아름다운 나비" },
  { timeStamp: 17, lyrics: "날개를 활짝 펴고 세상을 자유롭게 날거야" },
];

export default function Lyric() {
  return (
    <LyricWrapper>
      {/* 🚨 탈주 메시지 */}
      {/* <DisconnectMsg>겁쟁이 “머기조”님이 탈주했습니다!</DisconnectMsg> */}
      <TextWrapper>
        {data.map((item, i) => (
          <Text key={i}>{item.lyrics}</Text>
        ))}
      </TextWrapper>
    </LyricWrapper>
  );
}

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

// 🚨 탈주 메시지
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
