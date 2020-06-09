import React from 'react';
import PropTypes from 'prop-types';
import styles from './Seat.module.scss';
import clsx from 'clsx';

const Seat = ({ onClick, disabled, chosen }) => ( 
  <button
    className={clsx([styles.root, chosen && styles.chosen])}
    onClick={onClick}
    disabled={disabled}
  ></button>
);

Seat.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  chosen: PropTypes.bool,
};
 
export default Seat;