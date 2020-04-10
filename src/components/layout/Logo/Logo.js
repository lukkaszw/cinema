import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Logo = ({ size }) => {
  return ( 
    <Link
      className={styles.root}
      to="/"
    >
      <img 
        className={clsx([styles.image, size && styles[size]])}
        src="/gold-cinema-logo.svg"
        alt=""
      />
    </Link>
   );
}

Logo.propTypes = {
  size: PropTypes.string,
};
 
export default Logo;