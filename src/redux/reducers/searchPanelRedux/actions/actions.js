/* action name creators */
const reducerName = 'search-panel';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_FETCH_DATA = createActionName('SET_FETCH_DATA');
const SET_FETCH_ERROR = createActionName('SET_FETCH_ERROR');
const RESET_QUERY = createActionName('RESET_QUERY');

export default {
  START_FETCHING,
  SET_FETCH_DATA,
  SET_FETCH_ERROR,
  RESET_QUERY,
};