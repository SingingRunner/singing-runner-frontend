import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../styles/globalStyles";
import { RecoilRoot } from "recoil";
import { SocketProvider } from "../src/commons/contexts/SocketContext";
import Head from "next/head";

const songFiles = [
  "/music/jjanggu_mr.wav",
  "/music/jjanggu_mr_3keyup.wav",
  "/music/jjanggu_mr_3keydown.wav",
];

const assetFiles = [
  "/game/brick/neon_floor.jpg",
  "/game/item/effect/frozen.png",
  "/game/item/effect/keyDown.png",
  "/game/item/effect/keyUp.png",
  "/game/item/effect/mute.png",
  "/game/item/effect/small_crash.mp3",
  "/game/item/cloud.png",
  "/game/item/frozen.png",
  "/game/item/keyDown.png",
  "/game/item/keyUp.png",
  "/game/item/mute.png",
  "/game/item/shield.png",
  "/game/player/profile/cat0.png",
  "/game/player/profile/cat1.png",
  "/game/player/profile/cat2.png",
  "/game/player/cat.glb",
  "/game/player/snowman.glb",
  // Add more asset file paths as needed
];

function getAsAttribute(filePath: string) {
  const fileExtension = String(filePath.split(".").pop());

  switch (fileExtension) {
    case "jpg":
    case "png":
      return "image";
    case "mp3":
    case "wav":
      return "audio";
    case "glb":
      return "model";
    case "js":
      return "script";
    default:
      console.error(`Unrecognized file extension: ${fileExtension}`);
      return "fetch"; // return 'fetch' or any appropriate value as per your use case
  }
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const allFiles = [...assetFiles, ...songFiles];

  return (
    <RecoilRoot>
      <SocketProvider>
        <Global styles={globalStyles} />
        <Head>
          {allFiles.map((file, index) => (
            <link
              key={index}
              rel="preload"
              href={file}
              as={getAsAttribute(file)}
            />
          ))}
        </Head>
        <Component {...pageProps} />
      </SocketProvider>
    </RecoilRoot>
  );
}
