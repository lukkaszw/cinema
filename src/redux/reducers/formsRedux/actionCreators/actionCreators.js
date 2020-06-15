import actions from '../actions/actions';

const startSending = (payload) => ({ payload, type: actions.START_SENDING });
const setError = (payload) => ({ payload, type: actions.SET_ERROR });
const setSuccess = (payload) => ({ payload, type: actions.SET_SUCCESS });
const resetAll = () => ({ type: actions.RESET_ALL })

export default {
  startSending,
  setError,
  setSuccess,
  resetAll,
};