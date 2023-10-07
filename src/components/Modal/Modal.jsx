import { ImageGalleryItem } from 'components/Image-gallery-item/ImageGalleryItem';
import css from './Modal.module.css';

export const Modal = () => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <ImageGalleryItem />
      </div>
    </div>
  );
};
