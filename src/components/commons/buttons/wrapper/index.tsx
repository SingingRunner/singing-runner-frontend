import PropTypes from "prop-types";
import { Wrapper } from "../../../../../src/components/units/main/Main.styles";

const ButtonWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonWrapper;
