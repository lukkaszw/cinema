/* action name creators */
const reducerName = 'show';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING_DATA = createActionName('START_FETCHING_DATA');
const SET_DATA = createActionName('SET_DATA');
const SET_ERROR = createActionName('SET_ERROR');
const SET_SEATS = createActionName('SET_SEATS');

export default {
  START_FETCHING_DATA,
  SET_DATA,
  SET_ERROR,
  SET_SEATS,
};