import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_LOADING });
const setError = () => ({ type: actions.SET_ERROR });
const setData = (payload) => ({ payload, type: actions.SET_DATA });

export default {
  startFetching,
  setError,
  setData,
};