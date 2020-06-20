import React from 'react';
import SeatsPanel from '../../SeatsPanel/SeatsPanel';
import OrderForm from '../../OrderForm/OrderForm';
import OrderConfirm from '../../OrderConfirm/OrderConfirm';
import PropTypes from 'prop-types';
import styles from './OrderPanelBoards.module.scss';

const OrderPanelBoards = ({ 
    orderStep, 
    name, surname, phone, email, valuesErrors,
    handleChangeInputValue,
    seats, chosenSeats, price, 
    handleToggleSeat, handleCancelTicket,
    isSendingOrder,
    handleSubmitOrder }) => {
  return ( 
      <div 
        className={styles.root}
        style={{
          transform: `translateX(-${((orderStep - 1) / 3) * 100}%)`
        }}
      >
      <div className={styles.board}>
        <SeatsPanel 
          seats={seats}
          handleToggleSeat={handleToggleSeat}
        />
      </div>
      <div className={styles.board}>
        <OrderForm 
          handleChangeInputValue={handleChangeInputValue}
          name={name}
          surname={surname}
          phone={phone}
          email={email}
          errors={valuesErrors}
        />
      </div>
      <div className={styles.board}>
        <OrderConfirm 
          name={name}
          surname={surname}
          phone={phone}
          email={email}
          chosenSeats={chosenSeats}
          handleCancelTicket={handleCancelTicket}
          price={price}
          onSubmitOrder={handleSubmitOrder}
          isSendingOrder={isSendingOrder}
        />
      </div>
    </div>
   );
}

OrderPanelBoards.propTypes = {
  orderStep: PropTypes.number.isRequired,
  seats: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChangeInputValue: PropTypes.func.isRequired,
  valuesErrors: PropTypes.object.isRequired,
  chosenSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  isSendingOrder: PropTypes.bool.isRequired,
  handleToggleSeat: PropTypes.func.isRequired,
  handleCancelTicket: PropTypes.func.isRequired,
  handleSubmitOrder: PropTypes.func.isRequired,
};
 
export default OrderPanelBoards;