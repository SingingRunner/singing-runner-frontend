import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../styles/globalStyles";
import { RecoilRoot } from "recoil";
import { SocketProvider } from "../src/commons/contexts/SocketContext";
import Layout from "../src/components/commons/layout/Layout";
import Head from "next/head";
import ApolloSetting from "../src/components/commons/apollo";
import { useEffect } from "react";
import { S3_PATH } from "../src/commons/constants/Constants";

const nonModelFiles = [
  `${S3_PATH}/game/floor/neon.png`,
  `${S3_PATH}/game/item/effect/frozen.png`,
  `${S3_PATH}/game/item/effect/keyDown.png`,
  `${S3_PATH}/game/item/effect/keyUp.png`,
  `${S3_PATH}/game/item/effect/mute.png`,
  `${S3_PATH}/game/item/effect/super.png`,
  `${S3_PATH}/game/item/effect/draggable_cloud.png`,
  `${S3_PATH}/game/item/effect/small_crash.mp3`,
  `${S3_PATH}/game/item/cloud.png`,
  `${S3_PATH}/game/item/frozen.png`,
  `${S3_PATH}/game/item/keyDown.png`,
  `${S3_PATH}/game/item/keyUp.png`,
  `${S3_PATH}/game/item/mute.png`,
  `${S3_PATH}/game/item/super.png`,
];

const modelFiles = [
  `${S3_PATH}/game/player/beluga.glb`,
  `${S3_PATH}/game/player/husky.glb`,
  `${S3_PATH}/game/player/puma.glb`,
  `${S3_PATH}/game/player/hare.glb`,
  `${S3_PATH}/game/player/lynx.glb`,
  `${S3_PATH}/game/player/moose.glb`,
  `${S3_PATH}/game/player/narwhal.glb`,
  `${S3_PATH}/game/player/puffin.glb`,
  `${S3_PATH}/game/player/leopard.glb`,
  `${S3_PATH}/game/player/snowman.glb`,
];

function preloadModel(url: string) {
  fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then(() => {})
    .catch((error) => {
      console.error(`Failed to preload model: ${url}`, error);
    });
}

function getAsAttribute(filePath: string) {
  const fileExtension = String(filePath.split(".").pop());

  switch (fileExtension) {
    case "jpg":
    case "png":
      return "image";
    case "mp3":
    case "wav":
      return "audio";
    case "js":
      return "script";
    default:
      console.error(`Unrecognized file extension: ${fileExtension}`);
      return ""; // 목적에 따라 return 'fetch' 해도 됨.
  }
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    modelFiles.forEach((modelUrl) => {
      preloadModel(modelUrl);
    });

    // 자바스크립트
    window.addEventListener("resize", () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    // 초기 로드시에도 실행
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <RecoilRoot>
      <ApolloSetting>
        <SocketProvider>
          <Global styles={globalStyles} />
          <Head>
            {/* 확대 방지 */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            {nonModelFiles.map((file, index) => (
              <link
                key={index}
                rel="preload"
                href={file}
                as={getAsAttribute(file)}
              />
            ))}
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SocketProvider>
      </ApolloSetting>
    </RecoilRoot>
  );
}
