import { useState } from "react";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import s from "./Form.module.css";

export default function Form({ onFormSubmit }) {
  const [imageName, setImageName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageName.trim() === "") {
      toast.error("🦄 Please enter the name!");
      return;
    }

    onFormSubmit(imageName);
    setImageName("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchFormButton}>
          <BsSearch size="20px" />
          <span className={s.searchFormButtonLabel}></span>
        </button>

        <input
          onChange={(e) => setImageName(e.currentTarget.value.toLowerCase())}
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
