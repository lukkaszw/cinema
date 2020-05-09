import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ message, action, btnTitle }) => {
  return ( 
    <div className={styles.root}>
      <p className={styles.message}>{message}</p>
      <Button 
        action={action}
      >
        {btnTitle}
      </Button>
    </div>
   );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  btnTitle: PropTypes.string.isRequired,
};
 
export default ErrorMessage;