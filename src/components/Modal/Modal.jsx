import { Component } from "react";
import { createPortal } from "react-dom";
import { FiXCircle } from "react-icons/fi";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydownClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydownClose);
  }

  handleKeydownClose = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, type, tag, onClose } = this.props;
    console.log(tag);
    return createPortal(
      <div onClick={this.handleBackdropClick} className={s.ModalBackdrop}>
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
}

export default Modal;
