import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';
import ordersActionCreators from '../../ordersRedux/actionCreators/actionCreators';
import formActionCreators from '../../formsRedux/actionCreators/actionCreators';

const fetchUserData = (token) => {
  const url = `${api.user.url}/${api.user.endpoints.data}`;

  return dispatch => {
    if(!token) {
      dispatch(actionCreators.setError());
      return;
    } 
    const AuthString = `Bearer ${token}`;
    dispatch(actionCreators.startFetching());
    return axios.get(url, { headers: { 'Authorization': AuthString } })
      .then(res => {
        const userOrders = res.data.orders;
        const data = res.data;
        delete data.orders;
        dispatch(actionCreators.setData(data));
        dispatch(ordersActionCreators.setUserOrders(userOrders));
      })
      .catch(() => dispatch(actionCreators.setError()));
  }
}

const sendReadNews = (token, newsId) => {
  const url = `${api.news.url}/${newsId}`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    return axios.patch(url, {}, { headers: { 'Authorization': AuthString }})
      .then(() => {
        dispatch(actionCreators.setNewsAsRead(newsId));
      })
      .catch(() => console.error('Error - cannot save news as read!'));
  }
}

const updateUserData = (token, data) => {
  const url = `${api.user.url}/${api.user.endpoints.data}`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.put(url, data, { headers: { 'Authorization': AuthString }})
      .then((res) => {
        dispatch(formActionCreators.setSuccess(res.data.message));
        dispatch(actionCreators.setData(res.data.userData));
      })
      .catch(() => dispatch(formActionCreators.setError('Error. Try again later!')));
  }
}

const updateUserPswd = (token, data) => {
  const url = `${api.user.url}/${api.user.endpoints.pswd}`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.patch(url, data, { headers: { 'Authorization': AuthString }})
      .then((res) => {
        dispatch(formActionCreators.setSuccess(res.data.message));
      })
      .catch(() => dispatch(formActionCreators.setError('Error. Make sure you provide correct data and try again!')));
  }
}

const deleteAccount = (token) => {
  const url = `${api.user.url}/me`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.delete(url, { headers: { 'Authorization': AuthString }})
      .then((res) => {
        dispatch(formActionCreators.setSuccess(res.data.message));
        dispatch(actionCreators.setData({}));
      })
      .catch(() => dispatch(formActionCreators.setError('Error. Can not delete your account. Try again later.')));
  }
}

export default {
  fetchUserData,
  sendReadNews,
  updateUserData,
  updateUserPswd,
  deleteAccount,
};