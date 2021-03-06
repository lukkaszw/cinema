import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const setFetchError = () => ({ type: actions.SET_FETCH_ERROR });
const setFetchData = (payload) => ({ payload, type: actions.SET_FETCH_DATA });

export default {
  startFetching,
  setFetchError,
  setFetchData,
};