import React, { Component } from "react";
import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Modal from "../Modal";
import Loader from "../UI/Loader";
import { fetchImage } from "../services/fetchApi";
import { FaGrinBeamSweat, FaHandMiddleFinger } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import ScrollToTop from "react-scroll-to-top";
import PropTypes from "prop-types";
import s from "./SearchInfo.module.css";

export default function SearchInfo({ imageName }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (!imageName) {
      return;
    }
    fetchImage(imageName, page)
      .then((data) => {
        if (page === 1) {
          setStatus("pending");
          setImages(data.hits);
          setStatus("resolved");
        }
        if (page !== 1) {
          setImages((prevState) => [...prevState, ...data.hits]);
          setStatus("resolved");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      })
      .finally(setLoading(false));
  }, [imageName, page]);

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
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

  if (status === "pending") {
    return <TailSpin height="50" width="50" color="grey" ariaLabel="loading" />;
  }

  if (status === "rejected" || images.length === 0) {
    return (
      <h1 className={s.textStatusReject}>
        <FaHandMiddleFinger /> Oops... we don't have "{imageName}" in database
      </h1>
    );
  }

  if (status === "resolved") {
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
          <Button onClick={handleLoadMore}>{loading && <Loader />}</Button>
        </Container>

        <ScrollToTop smooth />
      </>
    );
  }
}

SearchInfo.propTypes = {
  imageName: PropTypes.string.isRequired,
};
