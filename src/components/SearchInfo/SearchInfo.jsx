import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Modal from "../Modal";
import Loader from "../UI/Loader";
import { FaGrinBeamSweat, FaHandMiddleFinger } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import ScrollToTop from "react-scroll-to-top";
import PropTypes from "prop-types";
import s from "./SearchInfo.module.css";

export default function SearchInfo({
  imageName,
  images,
  onLoadMore,
  status,
  error,
}) {
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");
  const loading = status === "pending";

  const handleLoadMore = () => {
    onLoadMore();
  };

  const handleGalleryItem = (fullImageUrl, tags, type) => {
    setLargeImage(fullImageUrl);
    setTags(tags);
    setType(type);
    setShowModal(true);
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  if (status === "idle") {
    return (
      <p className={s.textStatusIdle}>
        <FaGrinBeamSweat size="30px" />
        <span className={s.innerTextIdle}>please enter the name images</span>
      </p>
    );
  }

  if (status === "pending" && images.length === 0) {
    return <TailSpin height="50" width="50" color="grey" ariaLabel="loading" />;
  }

  if (status === "rejected" || images.length === 0) {
    return (
      <h1 className={s.textStatusReject}>
        <FaHandMiddleFinger /> Oops... we don't have "{imageName}" in database
      </h1>
    );
  }

  return (
    <>
      {showModal && (
        <Modal
          type={type}
          tag={tags}
          largeImage={largeImage}
          onClose={openModal}
        />
      )}

      <ImageGallery>
        {images.map((image) => (
          <ImageGalleryItem
            onImageClick={handleGalleryItem}
            key={image.id}
            data={image}
          />
        ))}
      </ImageGallery>

      <Container>
        <Button onClick={handleLoadMore}>
          {loading && <Loader />} Load more
        </Button>
      </Container>

      <ScrollToTop smooth />
    </>
  );
}

SearchInfo.propTypes = {
  imageName: PropTypes.string.isRequired,
};
