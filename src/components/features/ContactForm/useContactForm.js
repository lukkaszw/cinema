import { useState, useCallback } from 'react';
import _v from 'validator';

const useContactForm = (sendData) => {
  const [message, changeMessage] = useState('');
  const [email, changeEmail] = useState('');
  const [emailError, updateEmailError] = useState('');
  const [messageError, updateMessageError] = useState('');

  const onChangeMessage = useCallback((e) => {
    const value = e.target.value;
    if(value.length > 1000) {
      updateMessageError('Allowed maximum 1000 chracters!');
    } else {
      updateMessageError('');
    }
    changeMessage(e.target.value)
  }, [changeMessage, updateMessageError]);

  const onChangeEmail = useCallback((e) => {
    const value = e.target.value;
    if(!_v.isEmail(value) && value.length > 0) {
      updateEmailError('Provide proper email address!');
    } else {
      updateEmailError('');
    }
    changeEmail(e.target.value);
  }, [changeEmail, updateEmailError]);

  const onSubmit = useCallback(() => {
    if(message.length === 0) {
      updateMessageError('Could not send empty message!');
      return;
    }
    if(email.length === 0) {
      updateEmailError('Provide proper email address!');
      return;
    }
    if(emailError || messageError) return;

    sendData({ message, email })
  }, [message, email, sendData, emailError, messageError]);
 


  return ({
    message,
    email,
    emailError,
    onChangeMessage,
    onChangeEmail,
    messageError,
    onSubmit,
  });
};

export default useContactForm;