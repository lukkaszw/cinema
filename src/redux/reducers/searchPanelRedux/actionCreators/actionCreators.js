import actions from '../actions/actions';

const startSearching = (searchedTitle) => ({ payload: searchedTitle, type: actions.START_FETCHING });
const setFoundData = (data) => ({ payload: data, type: actions.SET_FETCH_DATA });
const setError = () => ({ type: actions.SET_FETCH_ERROR });
const resetQuery = () => ({ type: actions.RESET_QUERY });

export default {
  startSearching,
  setFoundData,
  setError,
  resetQuery,
};