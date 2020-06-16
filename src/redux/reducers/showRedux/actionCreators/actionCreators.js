import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const setData = (payload) => ({ payload, type: actions.SET_FETCH_DATA });
const setError = () => ({ type: actions.SET_FETCH_ERROR });

export default {
  startFetching,
  setData,
  setError,
};
