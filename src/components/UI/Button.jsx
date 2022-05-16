import PropTypes from "prop-types";
import s from "./Ui.module.css";

const Button = ({ onClick, children }) => (
  <button className={s.ButtonLoadMore} onClick={onClick} type="button">
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
