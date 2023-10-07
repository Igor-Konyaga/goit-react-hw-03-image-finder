import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <div className={css.ImageGalleryItem}>
        <img className={css.ImageGalleryItemImage} src="" alt="" />
      </div>
    );
  }
}
