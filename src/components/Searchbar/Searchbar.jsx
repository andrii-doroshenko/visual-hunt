import { useState } from 'react';
import PropTypes from 'prop-types';
import CSS from './Searchbar.module.css';

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(value);
  };

  return (
    <header className={CSS.searchbar}>
      <form className={CSS.form} onSubmit={handleSubmit}>
        <button type="submit" className={CSS.form_button}>
          <span className={CSS.button_label}>Search</span>
        </button>

        <input
          className={CSS.input}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Searchbar;
