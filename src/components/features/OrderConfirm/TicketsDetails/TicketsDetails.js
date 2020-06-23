import React from 'react';
import TicketSummary from '../../TicketsPanel/TicketsSummary/TicketsSummary';
import Ticket from '../../TicketsPanel/Ticket/Ticket';
import PropTypes from 'prop-types';
import styles from './TicketsDetails.module.scss';

const TicketsDetails = ({ tickets, price, handleCancelTicket }) => {
  return ( 
    <div className={styles.root}>    
      <h3 className={styles.category}>
        Tickets: <span className={styles.ticketsAmount}>{tickets.length}</span>
      </h3>
        <ul className={styles.list}>
          {
            tickets.map(seatId => (
              <Ticket 
                key={seatId}
                ticketId={seatId}
                price={price}
                onCancel={() => handleCancelTicket(seatId)}
              />
            ))
          }
        </ul>
        <TicketSummary 
          tickets={tickets}
          price={price}
        />
    </div>
   );
}

TicketsDetails.propTypes = {
  tickets: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  handleCancelTicket: PropTypes.func.isRequired,
};

TicketsDetails.defaultProps = {
  tickets: [],
}
 
export default React.memo(TicketsDetails);