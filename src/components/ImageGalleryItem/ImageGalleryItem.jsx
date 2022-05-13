import s from "../ImageGalleryItem/ImageGalleryItem.module.css";
import { AiFillLike } from "react-icons/ai";
import { ImDownload2, ImEye } from "react-icons/im";
import { FaComment } from "react-icons/fa";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ data, onImageClick }) => {
  const {
    webformatURL,
    largeImageURL,
    type,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = data;

  const fullImage = () => onImageClick(largeImageURL, tags, type);

  return (
    <li className={s.imageGalleryItem} onClick={fullImage}>
      <img className={s.imageGalleryItemImage} src={webformatURL} alt={type} />
      <div className={s.metaContainer}>
        <p className={s.dataMeta}>
          <AiFillLike size="25px" />
          <span className={s.dataMetaText}>{likes}</span>
        </p>
        <p className={s.dataMeta}>
          <ImEye size="25px" />
          <span className={s.dataMetaText}>{views}</span>
        </p>
        <p className={s.dataMeta}>
          <FaComment size="25px" />
          <span className={s.dataMetaText}>{comments}</span>
        </p>
        <p className={s.dataMeta}>
          <ImDownload2 size="25px" />
          <span className={s.dataMetaText}>{downloads}</span>
        </p>
      </div>
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
