import Notiflix from 'notiflix';
import { Component } from 'react';
import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './Image-gallery/ImageGallery';
import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
import { SearchBar } from './Search-bar/SearchBar';
import { fetchImg } from 'services/api';

export class App extends Component {
  state = {
    images: null,
    search: '',
    page: 1,
    loadMore: false,
    isLoading: false,
    error: null,
  };

  onSubmitForm = ({ searchValue }) => {
    this.setState({ search: searchValue });
  };

  fetchSearchImg = async () => {
    try {
      this.setState({ isLoading: true, loadMore: false, images: null });
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
    }
  }

  handleClick = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSubmitForm} />
        {this.state.isLoading && <Loader />}
        <ImageGallery images={this.state.images} />
        {this.state.loadMore && <Button handleClick={this.handleClick} />}
        {/* <Modal /> */}
        {this.state.error && Notiflix.Notify.failure(this.state.error)}
      </div>
    );
  }
}
