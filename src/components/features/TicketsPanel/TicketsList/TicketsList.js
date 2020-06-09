import React from 'react';
import Ticket from '../Ticket/Ticket';
import PropTypes from 'prop-types';
import styles from './TicketsList.module.scss';

const TicketsList = ({ tickets, handleCancelTicket, price }) => {
  return ( 
    <div className={styles.root}>
      {
        tickets.length === 0 &&
          <p className={styles.message}>
            No tickets chosen!
          </p>
      }
      <ul className={styles.list}>
        {
          tickets.map(ticketId => (
            <Ticket 
              key={ticketId}
              ticketId={ticketId}
              price={price}
              onCancel={() => handleCancelTicket(ticketId)}
            />
          ))
        }
      </ul>
    </div>
   );
}

TicketsList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.string),
  handleCancelTicket: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

TicketsList.defaultProps = {
  tickets: [],
}
 
export default TicketsList;