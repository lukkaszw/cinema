import React from 'react';
import Button from '../../common/Button/Button';
import TicketsDetails from './TicketsDetails/TicketsDetails';
import PurchaserDetails from './PurchaserDetails/PurchaserDetails';
import PropTypes from 'prop-types';
import styles from './OrderConfirm.module.scss';

const OrderConfirm = ({ name, surname, phone, email, price, chosenSeats, handleCancelTicket, onSubmitOrder, isSendingOrder }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <PurchaserDetails 
          name={name}
          surname={surname}
          phone={phone}
          email={email}
        />
        <TicketsDetails 
          tickets={chosenSeats}
          handleCancelTicket={handleCancelTicket}
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