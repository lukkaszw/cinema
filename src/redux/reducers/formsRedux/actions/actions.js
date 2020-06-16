/* action name creators */
const reducerName = 'forms';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_SENDING = createActionName('START_SENDING');
const SET_SEND_ERROR = createActionName('SET_SEND_ERROR');
const SET_SEND_SUCCESS = createActionName('SET_SEND_SUCCESS');
const RESET_ALL = createActionName('RESET_ALL');

export default {
  START_SENDING,
  SET_SEND_ERROR,
  SET_SEND_SUCCESS,
  RESET_ALL,
};