import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set the desired height of the container */
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin-top: 20vh;
  margin-bottom: 48vh;
`;

export const ImageLogo = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
  /* margin: 0 0; Center the image horizontally */
`;

export const ImageVectorLeft = styled.img`
  position: absolute;
  left: 4vw;
  transform: translate(-540%, 0%);
  width: 36px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;

export const ImageVectorRight = styled.img`
  position: absolute;
  right: 4vw;
  transform: translate(540%, 0%);
  width: 36px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
`;

export const ImageCharacter = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px; /* Set the desired width */
  height: auto; /* Adjust the height proportionally */
  /* margin: 0 0; Center the image horizontally */
`;