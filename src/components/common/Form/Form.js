import React, { useCallback } from 'react';
import Loader from '../Loader/Loader';
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
      {
        isSending &&
          <div className={styles.loader}>
            <Loader 
              classes={['tiny']}
            />
          </div>
      }
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