/* action name creators */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_DATA = createActionName('SET_DATA');
const SET_ERROR = createActionName('SET_ERROR');
const SET_NEWS_AS_READ = createActionName('SET_NEWS_AS_READ');

export default {
  START_FETCHING,
  SET_DATA,
  SET_ERROR,
  SET_NEWS_AS_READ,
};