/* action name creators */
const reducerName = 'movie-page';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_LOADING = createActionName('START_LOADING');
const SET_ERROR = createActionName('SET_ERROR');
const SET_DATA = createActionName('SET_DATA');

export default {
  START_LOADING,
  SET_ERROR,
  SET_DATA,
};