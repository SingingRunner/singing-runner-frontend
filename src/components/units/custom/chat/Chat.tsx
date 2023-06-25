import { useEffect, useState } from "react";
import type { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import styled from "@emotion/styled";
import Bgm from "../bgm/Bgm";

const VoiceChat = (props: { roomId: string }) => {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [microphoneTrack, setMicrophoneTrack] =
    useState<IMicrophoneAudioTrack | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const loadAgora = async () => {
      const { initAgora } = await import("./initAgora"); // dynamic import

      const APP_ID = process.env.APPKEY || "";
      const { client, microphoneTrack } = await initAgora(
        APP_ID,
        props.roomId,
        null
      );

      setClient(client);
      setMicrophoneTrack(microphoneTrack);
    };

    loadAgora();

    return () => {
      microphoneTrack?.close();
      client?.leave();
    };
  }, []);

  const toggleMute = () => {
    if (microphoneTrack) {
      microphoneTrack.setEnabled(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  return (
    <Wrapper>
      <Bgm />
      <div>
        <Label>음성채팅</Label>
        <Btn isMuted={isMuted} onClick={toggleMute}>
          {isMuted ? "ON" : "OFF"}
        </Btn>
      </div>
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
const Label = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  margin: 0 8px 0 24px;
`;
const Btn = styled.button`
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
