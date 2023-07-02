import styled from "@emotion/styled";

export const container = styled.div`
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
  width: 300px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;
