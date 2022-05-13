import { useState } from "react";
import Form from "./Form";
import SearchInfo from "./SearchInfo";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [imageName, setImageName] = useState("");

  return (
    <>
      <Form onFormSubmit={(inputValueName) => setImageName(inputValueName)} />
      <div className="container">
        <SearchInfo imageName={imageName} />
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}
