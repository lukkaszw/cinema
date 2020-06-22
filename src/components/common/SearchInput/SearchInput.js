import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';
import PropTypes from 'prop-types';
import styles from './SearchInput.module.scss';

const SearchInput = ({ value, onChange, onSubmit, placeholder}) => {
  return ( 
    <form 
      onSubmit={onSubmit}
      className={styles.root}
    >
      <input
        className={styles.input}
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <span className={styles.iconBtn}>
        <IconButton 
          icon={faSearch}
          ariaLabel='Search'
        />
      </span>

    </form>
   );
}
 
SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchInput;