/* action name creators */
const reducerName = 'forms';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_SENDING = createActionName('START_SENDING');
const SET_ERROR = createActionName('SET_ERROR');
const SET_SUCCESS = createActionName('SET_SUCCESS');
const RESET_ALL = createActionName('RESET_ALL');

export default {
  START_SENDING,
  SET_ERROR,
  SET_SUCCESS,
  RESET_ALL,
};