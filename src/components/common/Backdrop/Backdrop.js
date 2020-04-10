import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Backdrop.module.scss';

const Backdrop = ({ isActive, closeAction }) => ( 
  <div 
    className={clsx([styles.root, isActive && styles.active])}
    onClick={closeAction || null}
  />
);

Backdrop.propTypes = {
  isActive: PropTypes.bool.isRequired,
  closeAction: PropTypes.func,
};

Backdrop.defaultProps = {
  isActive: false,
};
 
export default Backdrop;