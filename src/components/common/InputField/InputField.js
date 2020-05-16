import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.scss';
import clsx from 'clsx';

const InputField = ({ onChange, value, type, placeholder, isError, message }) => {

  return ( 
    <div className={clsx([styles.root, isError && styles.error ])}>
      <input  
        type={type ? type : 'text'}
        value={value} 
        placeholder={placeholder}
        onChange={onChange} 
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
}
 
export default InputField;