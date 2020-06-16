import actions from '../actions/actions';

const startSending = (payload) => ({ payload, type: actions.START_SENDING });
const setSendError = (payload) => ({ payload, type: actions.SET_SEND_ERROR });
const setSendSuccess = (payload) => ({ payload, type: actions.SET_SEND_SUCCESS });
const resetAll = () => ({ type: actions.RESET_ALL })

export default {
  startSending,
  setSendError,
  setSendSuccess,
  resetAll,
};