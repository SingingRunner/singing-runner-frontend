import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../styles/globalStyles";
import { RecoilRoot } from "recoil";
import { SocketProvider } from "../src/commons/contexts/SocketContext";
import Layout from "../src/components/commons/layout/Layout";
import Head from "next/head";
import ApolloSetting from "../src/components/commons/apollo";
import { PollingProvider } from "../src/commons/contexts/PollingContext";

const assetFiles = [
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
  const allFiles = [...assetFiles];

  return (
    <RecoilRoot>
      <ApolloSetting>
        <SocketProvider>
          <PollingProvider>
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
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PollingProvider>
        </SocketProvider>
      </ApolloSetting>
    </RecoilRoot>
  );
}
