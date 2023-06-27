import styled from "@emotion/styled";

export const LogoWrapper = styled.div`
  position: fixed;
  top: 8px;
  left: 16px;
  height: 40px;
  display: flex;
  align-items: center;
`;
export const LogoText = styled.div`
  font-family: PyeongChangPeace-Bold;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  text-shadow: #bd00fe 0px 0px 10px;
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
  img {
    height: 40px;
    width: 40px;
    margin: 0 -4px;
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 18px;
  right: 46px;
  background-color: red;
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
`;

export const MatchButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ImageWrapper = styled.div`
  position: relative;
  top: 30%;
`;
export const ImageLogo = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 0px;
  width: 300px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;
export const ImageVectorLeft = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-1000%, -0%);
  top: 0px;
  width: 16px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;
export const ImageEllipse = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: -60px;
`;
export const ImageVector = styled.img`
  position: absolute;
  top: -58px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Timer = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

export const MatchButton = styled.button`
  width: calc(100% - 32px);
  justify-content: center;
  align-items: center;
  height: 48px;
  font-size: 16px;
  background: #bd00fe;
  border: 1px solid #bd00fe;
  border-radius: 4px;
  box-shadow: 0px 0px 15px 5px rgba(189, 0, 254, 0.5);
  color: #ffffff;
  transition: 0.25s;
  margin-bottom: 16px;
`;
