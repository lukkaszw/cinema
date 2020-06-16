import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const setFetchData = (payload) => ({ payload, type: actions.SET_FETCH_DATA });
const setFetchError = () => ({ type: actions.SET_FETCH_ERROR });
const setNewsAsRead = (payload) => ({ payload, type: actions.SET_NEWS_AS_READ });

export default {
  startFetching,
  setFetchData,
  setFetchError,
  setNewsAsRead,
};