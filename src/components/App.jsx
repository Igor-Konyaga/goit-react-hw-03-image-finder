import css from './App.module.css';
import { ImageGallery } from './Image-gallery/ImageGallery';
import { SearchBar } from './Search-bar/SearchBar';

export const App = () => {
  return (
    <div className={css.App}>
      <SearchBar />
      <ImageGallery />
    </div>
  );
};
