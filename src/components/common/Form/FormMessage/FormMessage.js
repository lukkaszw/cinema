import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button';
import PropTypes from 'prop-types';
import styles from './FormMessage.module.scss';
import clsx from 'clsx';


const FormMessage = ({ isError, message, resetMessage }) => {
  let btnVariant = null;
  if(!isError) {
    btnVariant = 'tertiary';
  }
  
  return ( 
    <div className={clsx([styles.root, isError && styles.error])}>
      <span className={styles.sign}>
        <FontAwesomeIcon icon={isError ? faTimes : faCheck} />
      </span>
      <span className={styles.message}>
        {message}
      </span>
      <div className={styles.confirmMsg}>
        <Button
          action={resetMessage}
          variants={[btnVariant]}
        >
          Ok
        </Button>
      </div>
    </div>
   );
}

FormMessage.propTypes = {
  isError: PropTypes.bool,
  message: PropTypes.string.isRequired,
  resetMessage: PropTypes.func.isRequired,
}
 
export default FormMessage;