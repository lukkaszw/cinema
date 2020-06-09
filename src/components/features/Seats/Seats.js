import React from 'react';
import SeatsRow from './SeatsRow/SeatsRow';
import styles from './Seats.module.scss';
import PropTypes from 'prop-types';
import { ROWS } from '../../../utils/seats/seats';

const Seats = ({ seats, handleToggleSeat }) => {
  return ( 
    <div className={styles.root}>
      {
        seats.map((seatsRow, i) => (
          <SeatsRow 
            handleToggleSeat={handleToggleSeat}
            key={ROWS[i]}
            seats={seatsRow}
          />
        ))
      }
    </div>
   );
}

Seats.propTypes = {
  seats: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  handleToggleSeat: PropTypes.func.isRequired,
}
 
export default Seats;