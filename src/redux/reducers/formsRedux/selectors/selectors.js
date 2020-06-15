const getIsSending = ({ formsState }) => formsState.sending.isActive;
const getIsError = ({ formsState }) => formsState.sending.isError;
const getIsSuccess = ({ formsState }) => formsState.sending.isSuccess;
const getMessage = ({ formsState }) => formsState.message;
const getDestination = ({ formsState }) => formsState.destination;

export default {
  getIsSending,
  getIsError,
  getIsSuccess,
  getMessage,
  getDestination,
};