/* action name creators */
const reducerName = 'search-panel';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_SEARCHING = createActionName('START_SEARCHING');
const SET_FOUND_DATA = createActionName('SET_FOUND_DATA');
const SET_ERROR = createActionName('SET_ERROR');
const RESET_QUERY = createActionName('RESET_QUERY');

export default {
  START_SEARCHING,
  SET_FOUND_DATA,
  SET_ERROR,
  RESET_QUERY,
};