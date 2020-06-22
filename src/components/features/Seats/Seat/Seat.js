import React from 'react';
import PropTypes from 'prop-types';
import styles from './Seat.module.scss';
import clsx from 'clsx';

const Seat = ({ seatId, onClick, disabled, chosen }) => ( 
  <button
    className={clsx([styles.root, chosen && styles.chosen])}
    onClick={onClick}
    disabled={disabled}
    aria-label={`toggle seat ${seatId}`}
  ></button>
);

Seat.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  chosen: PropTypes.bool,
  seatId: PropTypes.string.isRequired,
};
 
export default Seat;