import api from '../../../config/api';
import axios from 'axios';
import {
  startSending as startSendingOrder,
  setError as setOrderError,
  setSuccess as setOrderSuccess,
} from '../formsRedux/formsRedux';

/* selectors */
export const getUserOrders = ({ orders }) => orders.userOrders;


/* action name creators */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const SET_USER_ORDERS = createActionName('SET_USERS_ORDERS');
export const DELETE_USER_ORDER = createActionName('DELETE_USER_ORDER');

/* action creators */
export const setUserOrders = (payload) => ({ payload, type: SET_USER_ORDERS });
export const deleteUserOrder = (payload) => ({ payload, type: DELETE_USER_ORDER });

/* async action creators */

export const orderTickets = (orderData, token) => {
  const url = `${api.url}/${api.endpoints.orders}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(startSendingOrder());
    return axios.post(url, orderData, config)
      .then(res => {
        dispatch(setOrderSuccess());
      })
      .catch(() => dispatch(setOrderError()));
  }
}

export const deleteOrder = (orderId, token) => {
  const url = `${api.url}/${api.endpoints.orders}/${orderId}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(startSendingOrder());
    return axios.delete(url, config)
      .then(res => {
        dispatch(setOrderSuccess());
        dispatch(deleteUserOrder(res.data));
      })
      .catch(() => dispatch(setOrderError()));
  }
}


const ordersReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case SET_USER_ORDERS: {
      return {
        ...statePart,
        userOrders: action.payload,
      };
    }
    case DELETE_USER_ORDER: {
      return {
        ...statePart,
        userOrders: statePart.userOrders.filter(order => order._id !== action.payload),
      }
    }
    default: 
    return statePart;
  }
};

export default ordersReducer;