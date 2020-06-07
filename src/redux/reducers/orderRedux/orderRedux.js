import api from '../../../config/api';
import axios from 'axios';
import {
  startSending as startSendingOrder,
  setError as setOrderError,
  setSuccess as setOrderSuccess,
} from '../formsRedux/formsRedux';

/* action name creators */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;


export const orderTickets = (orderData, token) => {
  const url = `${api.url}/${api.endpoints.orders}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(startSendingOrder())
    return axios.post(url, orderData, config)
      .then(res => {
        dispatch(setOrderSuccess());
      })
      .catch(() => dispatch(setOrderError()));
  }
}


const orderReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    default: 
    return statePart;
  }
};

export default orderReducer;