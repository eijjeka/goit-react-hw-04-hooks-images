import React, { Component } from "react";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import s from "./Form.module.css";

class Form extends Component {
  state = {
    imageName: "",
  };

  handleChangeInput = (e) => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.imageName.trim() === "") {
      toast.error("🦄 Please enter the name!");
      return;
    }

    this.props.onFormSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <BsSearch size="20px" />
            <span className={s.searchFormButtonLabel}></span>
          </button>

          <input
            onChange={this.handleChangeInput}
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Form;
