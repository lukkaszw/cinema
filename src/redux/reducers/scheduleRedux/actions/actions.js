/* action name creators */
const reducerName = 'schedule';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_ERROR = createActionName('SET_ERROR');
const SET_DATA = createActionName('SET_DATA');
const SET_PAGE = createActionName('SET_PAGE');
const CHANGE_SEARCH_TEXT = createActionName('CHANGE_SEARCH_TEXT');

export default {
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_PAGE,
  CHANGE_SEARCH_TEXT,
};