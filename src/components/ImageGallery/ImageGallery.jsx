import s from "./ImageGallery.module.css";

const ImageGallery = ({ children }) => (
  <ul className={s.imageGallery}>{children}</ul>
);

export default ImageGallery;
