import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const setError = () => ({ type: actions.SET_FETCH_ERROR });
const setData = (payload) => ({ payload, type: actions.SET_FETCH_DATA });

export default {
  startFetching,
  setError,
  setData,
};