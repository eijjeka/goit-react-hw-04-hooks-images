import { TailSpin } from "react-loader-spinner";
import s from "./Ui.module.css";

const Loader = () => (
  <span className={s.loader}>
    <TailSpin height="40" width="40" color="#ffffff" ariaLabel="loading" />
  </span>
);

export default Loader;
