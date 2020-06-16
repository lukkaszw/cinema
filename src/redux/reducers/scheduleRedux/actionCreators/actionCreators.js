import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const fetchError = () => ({ type: actions.SET_FETCH_ERROR });
const fetchSucceded = (payload) => ({ payload, type: actions.SET_FETCH_DATA });
const setPage = (payload) => ({ payload, type: actions.SET_PAGE });
const changeSearchText = (payload) => ({ payload, type: actions.CHANGE_SEARCH_TEXT });

export default {
  startFetching,
  fetchError,
  fetchSucceded,
  setPage,
  changeSearchText,
};