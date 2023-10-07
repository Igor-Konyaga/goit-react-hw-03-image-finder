import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/Image-gallery-item/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <section className={css.ImageGallery}>
        <ImageGalleryItem />
      </section>
    );
  }
}
