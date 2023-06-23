import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    font-size: 14px;
  }
  html,
  body {
    overflow: hidden;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard-bold";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
`;
