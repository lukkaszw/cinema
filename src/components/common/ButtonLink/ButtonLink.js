import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './ButtonLink.module.scss';

const ButtonLink = ({ title, to, size, secondaryAction, disabled }) => {
  return ( 
    <Link
      to={to}
      className={clsx([styles.root, size && styles[size], disabled && styles.disabled ])}
      onClick={secondaryAction || null}
    >
      {title}
    </Link>
   );
}

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  secondaryAction: PropTypes.func,
};
 
export default ButtonLink;