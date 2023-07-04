import { css } from "@emotion/react";
import styled from "@emotion/styled";

const fontStyle = (fontFamily, fontWeight, fontSize) => css`
  font-family: ${fontFamily};
  font-weight: ${fontWeight};
  font-size: ${fontSize};
`;

export const Container = styled.div`
  height: 88vh;
  background-color: #1a1128;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  position: relative;
  top: 20%;
`;
export const ImageLogo = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 0px;
  width: 300px;
  height: auto;
`;

export const SocialWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 126px;
`;

export const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fee500;
  height: 40px;
  width: calc(50% - 20px);
  border-radius: 4px;
  border: none;
  padding-left: 12px;
  padding-right: 12px;
  --logo-text-gap: 32px;
  margin-right: 8px;
  cursor: pointer;
`;

export const KakaoLogo = styled.img`
  width: 17px;
  height: 17px;
  margin-right: calc(max(50% - 18px - var(--logo-text-gap), 22px));
`;

export const KakaoText = styled.div`
  ${fontStyle(
    `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
    500,
    "14px"
  )}
  display: flex;
  justify-content: center;
`;

export const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  height: 40px;
  width: calc(50% - 20px);
  border-radius: 4px;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  --logo-text-gap: 30px;
  cursor: pointer;
  &:hover {
    background: #eeeeee;
  }
`;

export const GoogleLogo = styled.img`
  width: 18px;
  height: 18px;
  margin-right: calc(max(50% - 18px - var(--logo-text-gap), 24px));
`;

export const GoogleText = styled.div`
  ${fontStyle("Roboto", 500, "14px")}
  display: flex;
  justify-content: center;
`;
