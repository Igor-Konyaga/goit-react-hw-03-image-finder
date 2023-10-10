import Notiflix from 'notiflix';
import { Component } from 'react';
import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './Image-gallery/ImageGallery';
import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
import { SearchBar } from './Search-bar/SearchBar';
import { fetchImg } from 'services/api';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: null,
    search: '',
    page: 1,
    loadMore: false,
    isLoading: false,
    modal: false,
    urlBigImg: null,
    error: null,
  };

  onSubmitForm = ({ searchValue }) => {
    this.setState({ search: searchValue, isLoading: true, loadMore: false });
  };

  fetchSearchImg = async () => {
    try {
      const { hits } = await fetchImg(this.state.search, this.state.page);
      this.setState(prevState => {
        return {
          images: [...(prevState.images || []), ...hits],
          loadMore: true,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.fetchSearchImg();
    } else if (prevState.search !== this.state.search) {
      this.setState({ images: null });
    }
  }

  handleClick = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleClickImg = e => {
    e.preventDefault();
    this.setState({ modal: true, urlBigImg: e.currentTarget.href });
  };

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSubmitForm} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          images={this.state.images}
          onClickImg={this.handleClickImg}
        />
        {this.state.loadMore && <Button handleClick={this.handleClick} />}
        {this.state.modal && <Modal urlImg={this.state.urlBigImg} />}
        {this.state.error && Notiflix.Notify.failure(this.state.error)}
      </div>
    );
  }
}
