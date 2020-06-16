import actions from '../actions/actions';

const startFetching = (searchedTitle) => ({ payload: searchedTitle, type: actions.START_FETCHING });
const setFetchData = (data) => ({ payload: data, type: actions.SET_FETCH_DATA });
const setFetchError = () => ({ type: actions.SET_FETCH_ERROR });
const resetQuery = () => ({ type: actions.RESET_QUERY });

export default {
  startFetching,
  setFetchData,
  setFetchError,
  resetQuery,
};