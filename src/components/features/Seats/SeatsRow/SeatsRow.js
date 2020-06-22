import React from 'react';
import Seat from '../Seat/Seat';
import PropTypes from 'prop-types';
import styles from './SeatsRow.module.scss';

const SeatsRow = ({ seats, handleToggleSeat }) => {
  return ( 
    <div className={styles.root}>
      {
        seats.map(seat => (
          <Seat 
            key={seat.seatId}
            seatId={seat.seatId}
            onClick={() => handleToggleSeat(seat.seatId)}
            {...seat}
          />
        ))
      }
    </div>
   );
}

SeatsRow.propTypes = {
  seats: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleToggleSeat: PropTypes.func.isRequired,
};
 
export default SeatsRow;