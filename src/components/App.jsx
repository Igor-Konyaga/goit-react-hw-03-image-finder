import Notiflix from 'notiflix';
import { Component } from 'react';
import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './Image-gallery/ImageGallery';
import { Loader } from './Loader/Loader';
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

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }
  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.fetchSearchImg();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  fetchSearchImg = async () => {
    try {
      const { hits, totalHits } = await fetchImg(
        this.state.search,
        this.state.page
      );

      this.setState(prevState => {
        return {
          images: [...(prevState.images || []), ...hits],
          loadMore: this.state.page < Math.ceil(totalHits / 12),
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleKey = e => {
    if (e.key === 'Escape') {
      this.setState({ modal: false });
    }
  };

  onSubmitForm = ({ searchValue }) => {
    if (!searchValue) {
      Notiflix.Notify.warning('Enter a search query!');
      return;
    } else if (searchValue === this.state.search) {
      Notiflix.Notify.info('This search query is already displayed!');
      return;
    }
    this.setState({
      search: searchValue,
      isLoading: true,
      loadMore: false,
      images: null,
    });
  };

  handleClick = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleClickImg = e => {
    e.preventDefault();
    this.setState({ modal: true, urlBigImg: e.currentTarget.href });
  };

  onCloseBtb = e => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onSubmitForm} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          images={this.state.images}
          onClickImg={this.handleClickImg}
          onCloseBtb={this.onCloseBtb}
        />
        {this.state.loadMore && <Button handleClick={this.handleClick} />}
        {this.state.modal && (
          <Modal
            urlImg={this.state.urlBigImg}
            onCloseBtb={this.onCloseBtb}
          />
        )}
        {this.state.error && Notiflix.Notify.failure(this.state.error)}
      </div>
    );
  }
}
