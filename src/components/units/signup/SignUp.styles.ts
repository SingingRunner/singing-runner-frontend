import styled from "@emotion/styled";

export const SignUpContainer = styled.div`
  height: 100vh;
  background-color: #1A1128;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SignUpHeaderWrapper = styled.div`
  margin-top: -8vh;
  margin-bottom: 24vh;
`;

export const InputButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const InputErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 10px;
`;

export const Error = styled.div`
  height: 18px;
  color: red;
`;

export const ErrorNickname = styled.div`
  height: 160px;
  color: red;
`;

export const BlankShort = styled.div`
  height: 18px;
`;

export const BlankLong = styled.div`
  height: 160px;
`;

export const PasswordWrapper = styled.div`
  width: 100%;
`;
