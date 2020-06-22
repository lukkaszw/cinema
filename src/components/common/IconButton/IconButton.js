import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './IconButton.module.scss';

const IconButton = ({ icon, action, disabled, notGrow, inactive, ariaLabel }) => {
  return ( 
    <button
      className={clsx([styles.root, notGrow && styles.notGrow, inactive && styles.inactive ])}
      onClick={action}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
   );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  action: PropTypes.func,
  ariaLabel: PropTypes.string,
};
 
export default IconButton;