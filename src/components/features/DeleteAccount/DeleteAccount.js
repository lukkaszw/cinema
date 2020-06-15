import React, { useEffect, useCallback } from 'react';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import PropTypes from 'prop-types';
import styles from './DeleteAccount.module.scss';

const DeleteAccount = ({ token, onDeleteAccount, onLogout, isDeleting, isError, isSuccess, onResetForm }) => {

  useEffect(() => () => onResetForm(), [onResetForm]);

  const onLogoutLocally = useCallback(() => {
    localStorage.removeItem('tkn');
    onLogout();
  }, [onLogout]);

  const onDeleteAction = useCallback(() => onDeleteAccount(token), [onDeleteAccount, token]);

  return ( 
    <div className={styles.root}>
      {
        (!isError && !isSuccess) &&
          <>
            <p className={styles.message}>
              Do you really want to delete your account?
              Your account is <strong className={styles.warning}>irrecoverable</strong>!
            </p>
            <div className={styles.btns}>
              <span className={styles.btn}>
                <ButtonLink 
                  to="/user/settings"
                  size="small"
                  variant="tertiary"
                  title="No"
                  disabled={isDeleting}
                />
              </span>
              <span className={styles.btn}>
                <Button
                  action={onDeleteAction}
                  variants={['small']}
                  disabled={isDeleting}
                >
                  Yes
                </Button>
              </span>
            </div>
          </>
      }
      {
        (isSuccess || isError) &&
          <div>
            <p className={styles.message}>
              {
                isSuccess  ? 'Your account has been deleted!' 
                : 'Error. We are not able to delete your account now! Please try again later.'
              }
            </p>
            <div className={styles.btns}>
              {
                isSuccess ? 
                <Button
                  variants={['small', 'tertiary']}
                  action={onLogoutLocally}
                >
                  Ok
                </Button>
                :
                <ButtonLink 
                  to="/user/settings"
                  size="small"
                  title="Ok"
                />
              }
            </div>
          </div>
        }
        {
          isDeleting &&
            <div className={styles.loader}>
              <Loader 
                classes={['tiny', 'red']}
              />
            </div>
        }
    </div>
   );
}

DeleteAccount.propTypes = {
  token: PropTypes.string.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  onResetForm: PropTypes.func.isRequired,
};
 
export default DeleteAccount;