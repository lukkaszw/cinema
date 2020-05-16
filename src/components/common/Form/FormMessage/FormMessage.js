import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../common/IconButton/IconButton';
import PropTypes from 'prop-types';
import styles from './FormMessage.module.scss';
import clsx from 'clsx';


const FormMessage = ({ isError, message, resetMessage }) => {

  return ( 
    <p className={clsx([styles.root, isError && styles.error])}>
      <span className={styles.sign}>
        <FontAwesomeIcon icon={isError ? faTimes : faCheck} />
      </span>
      <span className={styles.message}>
        {message}
      </span>
      <span className={styles.confirmMsg}>
        <IconButton 
          action={resetMessage}
          icon={faCheck} 
        />
      </span>
    </p>
   );
}

FormMessage.propTypes = {
  isError: PropTypes.bool,
  message: PropTypes.string.isRequired,
  resetMessage: PropTypes.func.isRequired,
}
 
export default FormMessage;