import React from 'react';
import Button from '../../../common/Button/Button';
import Loader from '../../../common/Loader/Loader';
import Modal from '../../../common/Modal/Modal';
import PropTypes from 'prop-types';
import styles from './DeleteOrderModal.module.scss';

const DeleteOrderModal = ({ onCancel, onConfirm, isSending, isError, isSuccess }) => {
  return ( 
    <Modal
      closeAction={onCancel}
    > 
      <div className={styles.root}>
        <p className={styles.message}>
          {
            isError ?
              'Error - the order has not been deleted! Please try again later!'
              :
              isSuccess ?
                'Success - the order has been deleted!'
                  :
                  'Are you sure you want to delete this order?'
          }
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
        {
          isSending &&
            <div className={styles.loader}>
              <Loader 
                classes={['tiny', 'red']}
              />
            </div>
        }
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