import { useEffect, useRef, useState } from "react";
import type { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import styled from "@emotion/styled";
import Bgm from "../bgm/Bgm";

const VoiceChat = (props: { roomId: string }) => {
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const microphoneTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const loadAgora = async () => {
      const { initAgora } = await import("./initAgora"); // dynamic import

      const APP_ID = process.env.NEXT_PUBLIC_APPKEY || "";

      const { client, microphoneTrack } = await initAgora(
        APP_ID,
        String(props.roomId),
        null
      );
      clientRef.current = client;
      microphoneTrackRef.current = microphoneTrack;
      if (microphoneTrackRef.current)
        microphoneTrackRef.current.setEnabled(false);
    };
    loadAgora();

    return () => {
      microphoneTrackRef.current?.close();
      clientRef.current?.leave();
      setIsMuted(false);
    };
  }, []);

  const toggleMute = () => {
    if (microphoneTrackRef.current) {
      microphoneTrackRef.current.setEnabled(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  return (
    <Wrapper>
      <Bgm />
      <BtnWrapper>
        <Label>음성채팅</Label>
        <Btn isMuted={isMuted} onClick={toggleMute}>
          {isMuted ? "ON" : "OFF"}
        </Btn>
      </BtnWrapper>
    </Wrapper>
  );
};
export default VoiceChat;

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  margin: 0 8px 0 24px;
`;
const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 24px;
  width: 44px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  ${(props: { isMuted: boolean }) => {
    return !props.isMuted
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
