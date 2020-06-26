import React from 'react';
import PropTypes from 'prop-types';
import styles from './Courtains.module.scss';
import clsx from 'clsx';

const Courtains = ({ isActive }) => {
  return ( 
    <div className={clsx([styles.root, isActive && styles.active])}>
      <div className={styles.leftCourtain} />
      <div className={styles.rightCourtain} />
    </div>
   );
}

Courtains.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
 
export default Courtains;