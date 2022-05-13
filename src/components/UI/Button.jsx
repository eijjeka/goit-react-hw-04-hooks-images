import PropTypes from "prop-types";
import s from "./Ui.module.css";

const Button = ({ onClick, children }) => (
  <button className={s.ButtonLoadMore} onClick={onClick} type="button">
    {children}
    Load more
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
