/* action name creators */
const reducerName = 'seats';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING_SEATS = createActionName('START_FETCHING_SEATS');
const SET_ERROR = createActionName('SET_ERROR');
const SET_DATA = createActionName('SET_DATA');

export default {
  START_FETCHING_SEATS,
  SET_ERROR,
  SET_DATA,
};