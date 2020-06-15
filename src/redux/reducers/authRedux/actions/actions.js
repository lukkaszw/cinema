/* action name creators */
const reducerName = 'auth';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOGIN = createActionName('LOGIN');
const LOGOUT = createActionName('LOGOUT');

export default {
  LOGIN,
  LOGOUT,
};