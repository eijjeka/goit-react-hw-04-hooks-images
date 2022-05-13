import s from "./Ui.module.css";

const Container = ({ children }) => {
  return <div className={s.containerUi}>{children}</div>;
};

export default Container;
