import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please Enter a valid query!');
      return;
    }

    props.onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.search__form}>
        <button type="submit" className={css.search__button}>
          <span className={css.search__label}>Search</span>
        </button>

        <input
          className={css.search__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
