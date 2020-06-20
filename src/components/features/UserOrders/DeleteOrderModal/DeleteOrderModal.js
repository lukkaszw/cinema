import React from 'react';
import Button from '../../../common/Button/Button';
import LoaderIndicator from '../../../common/LoaderIndicator/LoaderIndicator';
import Modal from '../../../common/Modal/Modal';
import PropTypes from 'prop-types';
import styles from './DeleteOrderModal.module.scss';

const MESSAGES = {
  question: 'Are you sure you want to delete this order?',
  error: 'Error - the order has not been deleted! Please try again later!',
  success: 'Success - the order has been deleted!',
};


const DeleteOrderModal = ({ onCancel, onConfirm, isSending, isError, isSuccess }) => {
  
  const text = isError ? MESSAGES.error : (isSuccess ? MESSAGES.success : MESSAGES.question);

  return ( 
    <Modal
      closeAction={onCancel}
    > 
      <div className={styles.root}>
        <p className={styles.message}>
          {text}
        </p>
        <div className={styles.btns}>
          {
            (isSuccess || isError) ?
              <Button
                variants={[(isSuccess ? 'tertiary' : null)]}
                action={onCancel}
              >
                Ok
              </Button>
              :
              (
                <>
                    <span className={styles.btn}>
                    <Button
                      variants={['tertiary']}
                      action={onCancel}
                      disabled={isSending}
                    >
                      No
                    </Button>
                  </span>
                  <span className={styles.btn}>
                    <Button
                      action={onConfirm}
                      disabled={isSending}
                    >
                      Yes
                    </Button>
                  </span>
                </>
              )
          }
        </div>
        <LoaderIndicator 
          isActive={isSending}
          size='tiny'
        />
      </div>
    </Modal>
   );
}

DeleteOrderModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};
 
export default DeleteOrderModal;