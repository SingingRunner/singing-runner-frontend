import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../styles/globalStyles";
import { RecoilRoot } from "recoil";
import { SocketProvider } from "../src/commons/contexts/SocketContext";
import Layout from "../src/components/commons/layout/Layout";
import Head from "next/head";
import ApolloSetting from "../src/components/commons/apollo";
import { PollingProvider } from "../src/commons/contexts/PollingContext";
import { useEffect } from "react";

const nonModelFiles = [
  "/game/floor/neon.png",
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
];

const modelFiles = [
  "/game/player/beluga.glb",
  "/game/player/husky.glb",
  "/game/player/puma.glb",
  "/game/player/hare.glb",
  "/game/player/lynx.glb",
  "/game/player/moose.glb",
  "/game/player/narwhal.glb",
  "/game/player/puffin.glb",
  "/game/player/leopard.glb",
  "/game/player/snowman.glb",
];

function preloadModel(url: string) {
  fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      console.log(`Preloaded model: ${url}`);
    })
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
          <PollingProvider>
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
          </PollingProvider>
        </SocketProvider>
      </ApolloSetting>
    </RecoilRoot>
  );
}
