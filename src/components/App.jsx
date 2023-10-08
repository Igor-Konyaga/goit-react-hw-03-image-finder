import { Component } from 'react';
import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './Image-gallery/ImageGallery';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
import { SearchBar } from './Search-bar/SearchBar';
import { fetchImg } from 'services/api';

export class App extends Component {
  state = {
    images: null,
    search: '',
    isLoading: false,
    error: null,
  };

  onSubmitForm = ({ searchValue }) => {
    this.setState({ search: searchValue });
  };

  fetchSearchImg = async () => {
    const { hits } = await fetchImg(this.state.search);

    this.setState({ images: hits });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchSearchImg();
    }
  }

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSubmitForm} />
        {/* <Loader /> */}
        <ImageGallery images={this.state.images} />
        <Button />
        {/* <Modal /> */}
      </div>
    );
  }
}
