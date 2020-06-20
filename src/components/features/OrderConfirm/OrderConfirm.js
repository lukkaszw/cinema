import React from 'react';
import Ticket from '../TicketsPanel/Ticket/Ticket';
import Button from '../../common/Button/Button';
import TicketSummary from '../TicketsPanel/TicketsSummary/TicketsSummary';
import PropTypes from 'prop-types';
import styles from './OrderConfirm.module.scss';

const OrderConfirm = ({ name, surname, phone, email, price, chosenSeats, handleCancelTicket, onSubmitOrder, isSendingOrder }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <h3 className={styles.category}>Purchaser:</h3>
        <p className={styles.value}><strong>{name} {surname}</strong></p>
        <h3 className={styles.category}>Contact details:</h3>
        <p className={styles.value}>
          tel: 
          <strong className={styles.contactItem}>{phone ? phone : '-'}</strong> 
        </p>
        <p className={styles.value}>
          email: 
          <strong className={styles.contactItem}>{email ? email : '-'}</strong>
        </p>
        <h3 className={styles.category}>Tickets: <span className={styles.ticketsAmount}>{chosenSeats.length}</span></h3>
        <ul className={styles.list}>
          {
            chosenSeats.map(seatId => (
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
          tickets={chosenSeats}
          price={price}
        />
        <p className={styles.info}>
          Please, made payment <strong className={styles.time}>30 min. before</strong> film show
        </p>
        <div className={styles.btn}>
          <Button
            variants={['tertiary']}
            action={onSubmitOrder}
            disabled={isSendingOrder}
          >
            Order!
          </Button>
        </div>
      </div>
    </div>
   );
}

OrderConfirm.propTypes = {
  name: PropTypes.string.isRequired, 
  surname: PropTypes.string.isRequired, 
  phone: PropTypes.string.isRequired, 
  email: PropTypes.string.isRequired, 
  price: PropTypes.number.isRequired, 
  chosenSeats: PropTypes.arrayOf(PropTypes.string).isRequired, 
  handleCancelTicket: PropTypes.func.isRequired , 
  onSubmitOrder: PropTypes.func.isRequired, 
  isSendingOrder: PropTypes.bool.isRequired,
};
 
export default OrderConfirm;