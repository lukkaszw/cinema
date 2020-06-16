/* action name creators */
const reducerName = 'seats';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_FETCH_ERROR = createActionName('SET_FETCH_ERROR');
const SET_FETCH_DATA = createActionName('SET_FETCH_DATA');

export default {
  START_FETCHING,
  SET_FETCH_ERROR,
  SET_FETCH_DATA,
};