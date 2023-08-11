import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { S3_PATH } from "../../../../commons/constants/Constants";

// 메인
export default function Bgm() {
  const [bgm, setBgm] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // BGM 설정
  useEffect(() => {
    const audio = new Audio(`${S3_PATH}/sound/bgm/waiting.mp3`);
    setBgm(audio);

    return () => {
      audio.pause(); // 컴포넌트가 언마운트될 때, 오디오를 멈춤
      audio.currentTime = 0; // 오디오의 현재 재생 위치를 초기화
    };
  }, []);

  // BGM 재생 상태에 따른 처리
  useEffect(() => {
    if (isPlaying) {
      bgm?.play();
    } else {
      bgm?.pause();
    }
  }, [bgm, isPlaying]);

  // 재생/일시정지 버튼 클릭 핸들러
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <BtnWrapper>
      <Label>BGM</Label>
      <Btn isMuted={!isPlaying} onClick={togglePlay}>
        {isPlaying ? "ON" : "OFF"}
      </Btn>
    </BtnWrapper>
  );
}
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  margin-right: 8px;
`;
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 24px;
  width: 44px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  ${(props: { isMuted: boolean }) => {
    return props.isMuted
      ? `
        color: #000;
        border: 1px solid #fff;
        box-shadow: 0px 0px 10px #fff;
        background-color: #fff;
        `
      : `
        color: #bd00fe;
        border: 1px solid #DFF45B;
        box-shadow: 0px 0px 10px #DFF45B;
        background-color: #DFF45B;
      `;
  }}
`;
