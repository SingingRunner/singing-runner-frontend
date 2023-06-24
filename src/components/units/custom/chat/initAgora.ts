import AgoraRTC from "agora-rtc-sdk-ng";

export async function initAgora(
  APP_ID: string,
  channel: string,
  uid: string | null
) {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
  await client.join(APP_ID, channel, uid);

  const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
  await client.publish([microphoneTrack]);

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "audio") {
      const audioTrack = user.audioTrack;
      if (audioTrack) {
        audioTrack.play();
      }
    }
  });

  return { client, microphoneTrack };
}
