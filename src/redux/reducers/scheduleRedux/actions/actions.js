/* action name creators */
const reducerName = 'schedule';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_FETCH_ERROR = createActionName('SET_FETCH_ERROR');
const SET_FETCH_DATA = createActionName('SET_FETCH_DATA');
const SET_PAGE = createActionName('SET_PAGE');
const CHANGE_SEARCH_TEXT = createActionName('CHANGE_SEARCH_TEXT');

export default {
  START_FETCHING,
  SET_FETCH_ERROR,
  SET_FETCH_DATA,
  SET_PAGE,
  CHANGE_SEARCH_TEXT,
};