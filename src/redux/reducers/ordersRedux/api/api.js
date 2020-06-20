import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';
import formActionCreators from '../../formsRedux/actionCreators/actionCreators';
import REDUX_UTILS from '../../../utils';

const orderTickets = (orderData, token) => {
  const url = `${api.url}/${api.endpoints.orders}`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.post(url, orderData, config)
      .then(res => {
        dispatch(formActionCreators.setSendSuccess());
      })
      .catch(() => dispatch(formActionCreators.setSendError()));
  }
}

const deleteOrder = (orderId, token) => {
  const url = `${api.url}/${api.endpoints.orders}/${orderId}`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.delete(url, config)
      .then(res => {
        dispatch(formActionCreators.setSendSuccess());
        dispatch(actionCreators.deleteUserOrder(res.data));
      })
      .catch(() => dispatch(formActionCreators.setSendError()));
  }
}

const editOrder = (orderData, token, editingId) => {
  const url = `${api.url}/${api.endpoints.orders}/${editingId}`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.patch(url, orderData, config)
      .then(res => {
        dispatch(formActionCreators.setSendSuccess());
        dispatch(actionCreators.updateUserOrder(res.data));
      })
      .catch(() => dispatch(formActionCreators.setSendError()));
  }
}

export default {
  orderTickets,
  deleteOrder,
  editOrder,
};