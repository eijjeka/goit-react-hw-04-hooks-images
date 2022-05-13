import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiXCircle } from "react-icons/fi";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ type, tag, largeImage, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydownClose);

    return window.removeEventListener("keydown", handleKeydownClose);
  });

  const handleKeydownClose = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className={s.ModalBackdrop}>
      <div className={s.ImageModal}>
        <button onClick={onClose} className={s.ButtonModal} type="button">
          <FiXCircle size="50px" />
        </button>
        <img src={largeImage} alt={type} />
        <span className={s.TextImage}>{tag}</span>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
