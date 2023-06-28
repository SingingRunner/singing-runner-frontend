import styled from "@emotion/styled";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc((var(--vh, 1vh) * 100) - 316px);
  justify-content: space-between;
`;
export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmailError = styled.div`
  height: 18px;
  color: red;
`;

export const PasswordError = styled.div`
  color: red;
  height: 18px;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;
