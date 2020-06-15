import actions from '../actions/actions';

const startSearching = (searchedTitle) => ({ payload: searchedTitle, type: actions.START_SEARCHING });
const setFoundData = (data) => ({ payload: data, type: actions.SET_FOUND_DATA });
const setError = () => ({ type: actions.SET_ERROR });
const resetQuery = () => ({ type: actions.RESET_QUERY });

export default {
  startSearching,
  setFoundData,
  setError,
  resetQuery,
};