import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';
import formActionCreators from '../../formsRedux/actionCreators/actionCreators';

const orderTickets = (orderData, token) => {
  const url = `${api.url}/${api.endpoints.orders}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.post(url, orderData, config)
      .then(res => {
        dispatch(formActionCreators.setSuccess());
      })
      .catch(() => dispatch(formActionCreators.setError()));
  }
}

const deleteOrder = (orderId, token) => {
  const url = `${api.url}/${api.endpoints.orders}/${orderId}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.delete(url, config)
      .then(res => {
        dispatch(formActionCreators.setSuccess());
        dispatch(actionCreators.deleteUserOrder(res.data));
      })
      .catch(() => dispatch(formActionCreators.setError()));
  }
}

const editOrder = (orderData, token, editingId) => {
  const url = `${api.url}/${api.endpoints.orders}/${editingId}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.patch(url, orderData, config)
      .then(res => {
        dispatch(formActionCreators.setSuccess());
        dispatch(actionCreators.updateUserOrder(res.data));
      })
      .catch(() => dispatch(formActionCreators.setError()));
  }
}

export default {
  orderTickets,
  deleteOrder,
  editOrder,
};