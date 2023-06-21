import styled from "@emotion/styled";

export const LoginContainer = styled.div`
  height: 100vh;
  background-color: #1A1128;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LoginHeaderWrapper = styled.div`
  margin-top: -60px;
  margin-bottom: 200px;
`;

export const EmailError = styled.div`
  height: 18px;
  color: red;
`;

export const PasswordError = styled.div`
  height: 240px;
  color: red;
`;

export const Blank = styled.div`
  height: 240px;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;