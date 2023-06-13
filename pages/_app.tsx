import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../src/commons/styles/globalStyles";

export default function App({ Component }: AppProps): JSX.Element {
  return (
    <>
      <Global styles={globalStyles} />
      <Component />
    </>
  );
}
