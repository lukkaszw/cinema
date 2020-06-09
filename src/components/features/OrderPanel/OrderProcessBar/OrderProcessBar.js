import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderProcessBar.module.scss';
import clsx from 'clsx';

const OrderProcessBar = ({ orderStep }) => {
  return ( 
    <div className={styles.root}>
      <div className={clsx([styles.step, orderStep >= 1 && styles.active])}>
        <span className={styles.nr}>1</span>
        Seats
      </div>
      <div className={clsx([styles.step, orderStep >= 2 && styles.active])}>
        <span className={styles.nr}>2</span>
        Form
      </div>
      <div className={clsx([styles.step, orderStep === 3 && styles.active])}>
        <span className={styles.nr}>3</span>
        Confirm
      </div>
    </div>
   );
}

OrderProcessBar.propTypes = {
  orderStep: PropTypes.number.isRequired,
};
 
export default OrderProcessBar;