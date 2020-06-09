import React from 'react';
import PropTypes from 'prop-types';
import styles from './TicketsSummary.module.scss';

const TicketsSummary = ({ tickets, price }) => {
  const totalPrice = Math.round(tickets.length * price * 100) / 100;
  return ( 
    <h3 className={styles.root}>
      Total price: <span className={styles.price}>{totalPrice} $</span>
    </h3>
   );
}

TicketsSummary.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number.isRequired,
};

TicketsSummary.defaultProps = {
  tickets: [],
};
 
export default TicketsSummary;