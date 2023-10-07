import { Component } from 'react';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {};
  render() {
    return (
      <header className={css.Searchbar}>
        <form action="#" className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}></button>
          <input
            type="text"
            className={css.SearchFormInput}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
