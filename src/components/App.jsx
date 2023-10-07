import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './Image-gallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Search-bar/SearchBar';

export const App = () => {
  return (
    <div className={css.App}>
      <SearchBar />
      <Loader />
      <ImageGallery />
      <Button />
      {/* <Modal /> */}
    </div>
  );
};
