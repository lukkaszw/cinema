/* action name creators */
const reducerName = 'movies';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_ERROR = createActionName('SET_ERROR');
const SET_DATA = createActionName('SET_DATA');
const SET_ALL_FILTER = createActionName('SET_FILTER');
const SET_CURRENT_FILTER = createActionName('SET_CURRENT_FILTER');
const SET_SEARCH_TEXT = createActionName('SET_SEARCH_TEXT');
const SET_PAGE = createActionName('SET_PAGE');
const SET_PLAY_TIME = createActionName('SET_PLAY_TIME');
const SET_SORT = createActionName('SET_SORT_BY');
const TOGGLE_GENRE = createActionName('TOGGLE_GENRE');
const RESET_FILTERS = createActionName('RESET_FILTERS');

export default {
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_ALL_FILTER,
  SET_CURRENT_FILTER,
  SET_SEARCH_TEXT,
  SET_PAGE,
  SET_PLAY_TIME,
  SET_SORT,
  TOGGLE_GENRE,
  RESET_FILTERS,
}