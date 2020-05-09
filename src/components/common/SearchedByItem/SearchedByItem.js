import React from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';
import PropTypes from 'prop-types';
import styles from './SearchedByItem.module.scss';

const SearchedByItem = ({ value, removeAction }) => {
  return ( 
    <div className={styles.root}>
      <span className={styles.text}>{value}</span>
      <IconButton 
        icon={faTimesCircle} 
        action={removeAction}
        notGrow
      />
    </div>
   );
}

SearchedByItem.propTypes = {
  value: PropTypes.string.isRequired,
  removeAction: PropTypes.func.isRequired,
}
 
export default SearchedByItem;