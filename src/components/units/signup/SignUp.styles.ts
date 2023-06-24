import styled from "@emotion/styled";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  justify-content: space-between;
`

export const SignUpInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const InputErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Error = styled.div`
  height: 18px;
  color: red;
`;

export const ErrorNickname = styled.div`
  height: 160px;
  color: red;
`;

export const PasswordWrapper = styled.div`
  width: 100%;
`;
