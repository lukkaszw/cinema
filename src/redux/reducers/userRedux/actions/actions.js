/* action name creators */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_FETCHING = createActionName('START_FETCHING');
const SET_FETCH_DATA = createActionName('SET_FETCH_DATA');
const SET_FETCH_ERROR = createActionName('SET_FETCH_ERROR');
const SET_NEWS_AS_READ = createActionName('SET_NEWS_AS_READ');

export default {
  START_FETCHING,
  SET_FETCH_DATA,
  SET_FETCH_ERROR,
  SET_NEWS_AS_READ,
};