import React, { Component } from "react";
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
import s from "./SearchInfo.module.css";

class SearchInfo extends Component {
  state = {
    images: null,
    error: null,
    page: 1,
    loading: true,
    status: "idle",
    showModal: false,
    largeImage: "",
    type: "",
    tags: "",
  };

  componentDidUpdate(prevProps) {
    const nextimageName = this.props.imageName;
    const prevImageName = prevProps.imageName;

    if (prevImageName !== nextimageName) {
      this.resetPage();
      this.setState({
        status: "pending",
        loading: true,
      });
      fetchImage(nextimageName)
        .then((data) =>
          this.setState({ images: data.hits, status: "resolved" })
        )
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        loading: true,
      }),
      () => {
        fetchImage(this.props.imageName, this.state.page).then((data) =>
          this.setState((prevState) => {
            return {
              images: [...prevState.images, ...data.hits],
              status: "resolved",
              loading: false,
            };
          })
        );
      }
    );
  };

  openModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleGalleryItem = (fullImageUrl, tags, type) => {
    this.setState({
      largeImage: fullImageUrl,
      tags: tags,
      type: type,
      showModal: true,
    });
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  resetPage = () => {
    this.setState({
      page: 1,
    });
  };

  render() {
    const { images, loading, status, showModal, largeImage, tags, type } =
      this.state;

    if (status === "idle") {
      return (
        <p className={s.textStatusIdle}>
          <FaGrinBeamSweat size="30px" />
          <span className={s.innerTextIdle}>please enter the name images</span>
        </p>
      );
    }

    if (status === "pending") {
      return (
        <TailSpin height="50" width="50" color="grey" ariaLabel="loading" />
      );
    }

    if (status === "rejected" || images.length === 0) {
      return (
        <h1 className={s.textStatusReject}>
          <FaHandMiddleFinger /> Oops... we don't have "{this.props.imageName}"
          in database
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
              onClose={this.openModal}
            />
          )}

          <ImageGallery>
            {images.map((image) => (
              <ImageGalleryItem
                onImageClick={this.handleGalleryItem}
                key={image.id}
                data={image}
              />
            ))}
          </ImageGallery>

          <Container>
            <Button onClick={this.handleLoadMore}>
              {loading && <Loader />}
            </Button>
          </Container>

          <ScrollToTop smooth />
        </>
      );
    }
  }
}

export default SearchInfo;
