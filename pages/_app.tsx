import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../styles/globalStyles";
import { RecoilRoot } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const songFiles = [
  '/music/snowflower_vocal_origin.wav',
  '/music/snowflower_vocal_3keydown.wav',
  '/music/snowflower_vocal_3keyup.wav',
];

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
