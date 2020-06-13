import React from 'react';
import Button from '../../../common/Button/Button';
import PropTypes from 'prop-types';
import styles from './OrderMessage.module.scss';

const OrderMessage = ({ message, action, isSuccess }) => {
  return ( 
    <div
      className={styles.root}
    >
      <p className={styles.message}>{message}</p>
      <div className={styles.btn}>
        <Button
          action={action}
          variants={[isSuccess ? 'tertiary' : null]}
        >
          Ok
        </Button>
      </div>
    </div>
   );
}

OrderMessage.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
 
export default OrderMessage;