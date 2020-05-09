import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchedByPanel.module.scss';

const SearchedByPanel = ({ children }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.searchPanel} >
        <span className={styles.searchedBy}>
          Searched by:
        </span>
        {
          children
        }
      </div>
    </div>
   );
}

SearchedByPanel.propTypes = {
  children: PropTypes.node,
};
 
export default SearchedByPanel;