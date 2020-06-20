import React, { useEffect, useCallback } from 'react';
import LoaderIndicator from '../../common/LoaderIndicator/LoaderIndicator';
import Button from '../../common/Button/Button';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import PropTypes from 'prop-types';
import styles from './DeleteAccount.module.scss';

const MESSAGES = {
  question: <>
    Do you really want to delete your account?
    Your account is <strong className={styles.warning}>irrecoverable</strong>!
  </>,
  success: 'Your account has been deleted!',
  error: 'Error. We are not able to delete your account now! Please try again later.',
};


const DeleteAccount = ({ token, onDeleteAccount, onLogout, isDeleting, isError, isSuccess, onResetForm }) => {

  useEffect(() => () => onResetForm(), [onResetForm]);

  const onLogoutLocally = useCallback(() => {
    localStorage.removeItem('tkn');
    onLogout();
  }, [onLogout]);

  const onDeleteAction = useCallback(() => onDeleteAccount(token), [onDeleteAccount, token]);
  const isQuestion = !isError && !isSuccess;
  const text = isQuestion ? MESSAGES.question : (isSuccess ? MESSAGES.success : MESSAGES.error);

  return ( 
    <div className={styles.root}>
      <LoaderIndicator 
        size='tiny'
        top={140}
        isActive={isDeleting}
      />
      <p className={styles.message}>
        {text}
      </p>
      <div className={styles.btns}>
        {
          isQuestion ?
            <>
              <ButtonLink 
                to="/user/settings"
                size="small"
                variant="tertiary"
                title="No"
                disabled={isDeleting}
              />
              <Button
                action={onDeleteAction}
                variants={['small']}
                disabled={isDeleting}
              >
                Yes
              </Button>
            </>
            :
            <>
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
            </>
        }
      </div>
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