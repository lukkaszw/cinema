import React, { useEffect } from 'react';
import Button from '../../common/Button/Button';
import Form from '../../common/Form/Form.container';
import InputField from '../../common/InputField/InputField';
import TextareaField from '../../common/TextareaField/TextareaField';
import useContactForm from './useContactForm';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';

const ContactForm = ({ sendData, resetForm }) => {
  const { message, email, emailError, messageError,  onChangeMessage, onChangeEmail, onSubmit } = useContactForm(sendData);
  useEffect(() => () => resetForm(), [resetForm]);
  
  return ( 
    <div className={styles.root}>
      <Form 
        onSubmit={onSubmit}
      >
        <div className={styles.input}>
          <InputField 
            value={email}
            type='email'
            onChange={onChangeEmail}
            placeholder='Your email address'
            isError={!!emailError}
            message={emailError}
          />
        </div>
        <div className={styles.textarea}>
          <TextareaField 
            value={message}
            onChange={onChangeMessage}
            placeholder='Your message'
            maxChars={1000}
            isError={!!messageError}
            message={messageError}
          />
        </div>

        <div className={styles.btn}>
          <Button>SEND</Button>
        </div>
      </Form>
    </div>
   );
}

ContactForm.propTypes = {
  sendData: PropTypes.func.isRequired,  
  resetForm: PropTypes.func.isRequired,
};
 
export default ContactForm;