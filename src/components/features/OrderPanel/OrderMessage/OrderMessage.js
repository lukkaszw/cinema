import React from 'react';
import Button from '../../../common/Button/Button';
import Backdrop from '../../../common/Backdrop/Backdrop';
import { ModalsPortal } from '../../../layout/Portals/Portals';
import PropTypes from 'prop-types';
import styles from './OrderMessage.module.scss';

const OrderMessage = ({ message, action, isSuccess }) => {
  return (
    <ModalsPortal renderPlace="modals">
      <Backdrop isActive={true}/>
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
    </ModalsPortal> 

   );
}

OrderMessage.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
 
export default OrderMessage;