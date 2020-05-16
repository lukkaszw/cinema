import React, { useCallback } from 'react';
import Button from '../../common/Button/Button';
import Form from '../../common/Form/Form.container';
import InputField from '../../common/InputField/InputField';
import TextareaField from '../../common/TextareaField/TextareaField';
import useContactForm from './useContactForm';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';

const ContactForm = ({ sendData, emailErrorMsg, messageErrorMsg }) => {
  const { message, email, onChangeMessage, onChangeEmail } = useContactForm();
  const onSubmit = useCallback(() => sendData({ message, email }), [message, email, sendData]);

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
            isError={!!emailErrorMsg}
            message={emailErrorMsg}
          />
        </div>
        <div className={styles.textarea}>
          <TextareaField 
            value={message}
            onChange={onChangeMessage}
            placeholder='Your message'
            isError={!!messageErrorMsg}
            message={messageErrorMsg}
            maxChars={1000}
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
  emailErrorMsg: PropTypes.string, 
  messageErrorMsg: PropTypes.string,
};
 
export default ContactForm;