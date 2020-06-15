/* action name creators */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_USER_ORDERS = createActionName('SET_USERS_ORDERS');
const DELETE_USER_ORDER = createActionName('DELETE_USER_ORDER');
const SET_ORDER_TO_EDIT = createActionName('SET_ORDER_TO_EDIT');
const UPDATE_USER_ORDER = createActionName('UPDATE_USER_ORDER');

export default {
  SET_USER_ORDERS,
  DELETE_USER_ORDER,
  SET_ORDER_TO_EDIT,
  UPDATE_USER_ORDER,
};