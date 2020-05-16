import { useState, useCallback } from 'react';

const useContactForm = () => {
  const [message, changeMessage] = useState('');
  const [email, changeEmail] = useState('');
  
  const onChangeMessage = useCallback((e) => changeMessage(e.target.value), [changeMessage]);
  const onChangeEmail = useCallback((e) => changeEmail(e.target.value), [changeEmail]);

  return ({
    message,
    email,
    onChangeMessage,
    onChangeEmail,
  });
};

export default useContactForm;