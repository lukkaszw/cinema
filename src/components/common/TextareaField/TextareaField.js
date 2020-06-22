import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextareaField.module.scss';
import clsx from 'clsx';

const TextareaField = ({ value, onChange, placeholder, isError, message, maxChars }) => {
  return ( 
    <div className={clsx([styles.root, (isError || value.length > maxChars) && styles.error])}>
      <textarea 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      >
      </textarea>
      {
        message &&
         <span className={styles.message}>
           {message}
         </span>
      }
      {
        (maxChars && value.length > 0) &&
          <span className={styles.maxChars}>
            {`${value.length}/${maxChars}`}
          </span>
      }
    </div>
   );
}

TextareaField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  message: PropTypes.string,
  maxChars: PropTypes.number,
};
 
export default TextareaField;