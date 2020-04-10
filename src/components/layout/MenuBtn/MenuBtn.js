import React from 'react';
import PropTypes from 'prop-types';
import styles from './MenuBtn.module.scss';
import clsx from 'clsx';

const MenuBtn = ({ isActive, toggleAction }) => {
  return ( 
    <button
      className={clsx([styles.root, isActive && styles.active])}
      aria-label="Mobile menu button"
      onClick={toggleAction}
    >
    </button>
   );
}

MenuBtn.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toggleAction: PropTypes.func.isRequired,
};
 
export default MenuBtn;