import { Wrapper } from '../../../../../styles/emotion';

const ButtonWrapper = ({ children }): JSX.Element => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default ButtonWrapper;