import React, { useCallback } from 'react';
import LoaderIndicator from '../LoaderIndicator/LoaderIndicator';
import FormMessage from './FormMessage/FormMessage';
import PropTypes from 'prop-types';
import styles from './Form.module.scss';

const Form = ({ onSubmit, isSending, isError, isSuccess, message, resetForm, children }) => {

  const submitAction = useCallback((e) => {
    e.preventDefault();
    onSubmit();
  }, [onSubmit]);

  return ( 
    <form
      className={styles.root}  
      onSubmit={submitAction}
    >
      { children }
      <LoaderIndicator
        isActive={isSending}
        top={80}
        size='tiny'
        color="white"
      />
      {
        (isSuccess || isError) &&
          <FormMessage 
            isError={isError}
            message={message}
            resetMessage={resetForm}
          />
      }
    </form>
   );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSending: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess:PropTypes.bool,
  message: PropTypes.string,
  resetForm: PropTypes.func,
};
 
export default Form;