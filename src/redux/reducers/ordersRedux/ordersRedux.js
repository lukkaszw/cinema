import api from '../../../config/api';
import axios from 'axios';
import {
  startSending as startSendingOrder,
  setError as setOrderError,
  setSuccess as setOrderSuccess,
} from '../formsRedux/formsRedux';

/* selectors */
export const getUserOrders = ({ orders }) => orders.userOrders;
export const getEditingOrder = ({ orders }) => orders.userOrders.find(order => order._id === orders.orderToEdit);
export const getEditingOrderUser = ({ orders }) => {
  const order = getEditingOrder({ orders });
  if(order) {
    return {
      name: order.name,
      surname: order.surname,
      phone: order.phone,
      email: order.email,
    };
  }
  return {};
}

/* action name creators */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const SET_USER_ORDERS = createActionName('SET_USERS_ORDERS');
export const DELETE_USER_ORDER = createActionName('DELETE_USER_ORDER');
export const SET_ORDER_TO_EDIT = createActionName('SET_ORDER_TO_EDIT');
export const UPDATE_USER_ORDER = createActionName('UPDATE_USER_ORDER');

/* action creators */
export const setUserOrders = (payload) => ({ payload, type: SET_USER_ORDERS });
export const deleteUserOrder = (payload) => ({ payload, type: DELETE_USER_ORDER });
export const setOrderToEdit = (payload) => ({ payload, type: SET_ORDER_TO_EDIT });
export const updateUserOrder = (payload) => ({ payload, type: UPDATE_USER_ORDER});

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

export const editOrder = (orderData, token, editingId) => {
  const url = `${api.url}/${api.endpoints.orders}/${editingId}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(startSendingOrder());
    return axios.patch(url, orderData, config)
      .then(res => {
        dispatch(setOrderSuccess());
        dispatch(updateUserOrder(res.data));
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
    case SET_ORDER_TO_EDIT: {
      return {
        ...statePart,
        orderToEdit: action.payload,
      }
    }
    case DELETE_USER_ORDER: {
      return {
        ...statePart,
        userOrders: statePart.userOrders.filter(order => order._id !== action.payload),
      }
    }
    case UPDATE_USER_ORDER: {
      return {
        ...statePart,
        userOrders: statePart.userOrders.map(order => {
          if(order._id === action.payload._id) {
            order = action.payload;
          }
          return order;
        }),
      }
    }
    default: 
    return statePart;
  }
};

export default ordersReducer;