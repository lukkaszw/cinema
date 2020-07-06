/* action name creators */
const reducerName = 'show';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_FETCH_DATA = createActionName('SET_FETCH_DATA');
const SET_FETCH_ERROR = createActionName('SET_FETCH_ERROR');
const RESET_DATA = createActionName('RESET_DATA');

export default {
  START_FETCHING,
  SET_FETCH_DATA,
  SET_FETCH_ERROR,
  RESET_DATA,
};