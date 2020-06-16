import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING });
const fetchError = () => ({ type: actions.SET_FETCH_ERROR });
const fetchSucceded = (payload) => ({ payload, type: actions.SET_FETCH_DATA });
const setAllMoviesFilter = (payload) => ({payload, type: actions.SET_ALL_FILTER });
const setCurrentMoviesFilter = (payload) => ({ payload, type: actions.SET_CURRENT_FILTER })
const setSearchText = (payload) => ({ payload, type: actions.SET_SEARCH_TEXT });
const setPage = (payload) => ({ payload, type: actions.SET_PAGE });
const setTimeFilter = (payload) => ({ payload, type: actions.SET_PLAY_TIME });
const setSortFilter = (payload) => ({ payload, type: actions.SET_SORT });
const toggleGenre = (payload) => ({ payload, type: actions.TOGGLE_GENRE });
const resetAllMoviesFilters = () => ({ type: actions.RESET_FILTERS });

export default {
  startFetching,
  fetchError,
  fetchSucceded,
  setAllMoviesFilter,
  setCurrentMoviesFilter,
  setSearchText,
  setPage,
  setTimeFilter,
  setSortFilter,
  toggleGenre,
  resetAllMoviesFilters,
};