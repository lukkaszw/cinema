import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styles from './IconButton.module.scss';

const IconButton = ({ icon, action }) => {
  return ( 
    <button
      className={styles.root}
      onClick={action}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
   );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  action: PropTypes.func,
};
 
export default IconButton;