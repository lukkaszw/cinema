import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const setFetchError = () => ({ type: actions.SET_FETCH_ERROR });
const setFetchData = (payload) => ({ payload, type: actions.SET_FETCH_DATA });
const setPage = (payload) => ({ payload, type: actions.SET_PAGE });
const changeSearchText = (payload) => ({ payload, type: actions.CHANGE_SEARCH_TEXT });

export default {
  startFetching,
  setFetchError,
  setFetchData,
  setPage,
  changeSearchText,
};