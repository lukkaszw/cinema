import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.scss';
import clsx from 'clsx';

const InputField = ({ onChange, value, type, placeholder, isError, message, autoComplete, disabled, isPassive }) => {

  return ( 
    <div className={clsx([styles.root, isError && styles.error, isPassive && styles.passive ])}>
      <input 
        type={type ? type : 'text'}
        value={value} 
        placeholder={placeholder}
        onChange={onChange} 
        autoComplete={autoComplete}
        disabled={disabled}
        aria-label={placeholder}
      />
      { 
        message &&
          <span className={styles.message}>
            {message}
          </span>
      }
    </div>
    
   );
}

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  message: PropTypes.string,
  isPassive: PropTypes.bool,
}
 
export default InputField;