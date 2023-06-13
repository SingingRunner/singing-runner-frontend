import PropTypes from 'prop-types';
import { Wrapper } from '../../../../../styles/emotion';

const ButtonWrapper = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonWrapper;