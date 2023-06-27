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
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraLight.woff")
      format("woff");
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
      format("woff");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Black.woff")
      format("woff");
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: "PyeongChangPeace-Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
`;
