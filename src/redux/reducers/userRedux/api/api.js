import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';
import ordersActionCreators from '../../ordersRedux/actionCreators/actionCreators';
import formActionCreators from '../../formsRedux/actionCreators/actionCreators';
import REDUX_UTILS from '../../../utils';

const fetchData = (token) => {
  const url = `${api.user.url}/${api.user.endpoints.data}`;

  return dispatch => {
    if(!token) {
      dispatch(actionCreators.setFetchError());
      return;
    } 
    const config = REDUX_UTILS.generateAuthConfig(token);

    dispatch(actionCreators.startFetching());
    return axios.get(url, config)
      .then(res => {
        const userOrders = res.data.orders;
        const data = res.data;
        delete data.orders;
        dispatch(actionCreators.setFetchData(data));
        dispatch(ordersActionCreators.setUserOrders(userOrders));
      })
      .catch(() => dispatch(actionCreators.setFetchError()));
  }
}

const sendReadNews = (token, newsId) => {
  const url = `${api.news.url}/${newsId}`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    return axios.patch(url, {}, config)
      .then(() => {
        dispatch(actionCreators.setNewsAsRead(newsId));
      })
      .catch(() => console.error('Error - cannot save news as read!'));
  }
}

const updateUserData = (token, data) => {
  const url = `${api.user.url}/${api.user.endpoints.data}`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.put(url, data, config)
      .then((res) => {
        dispatch(formActionCreators.setSendSuccess(res.data.message));
        dispatch(actionCreators.setFetchData(res.data.userData));
      })
      .catch(() => dispatch(formActionCreators.setSendError('Error. Try again later!')));
  }
}

const updateUserPswd = (token, data) => {
  const url = `${api.user.url}/${api.user.endpoints.pswd}`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.patch(url, data, config)
      .then((res) => {
        dispatch(formActionCreators.setSendSuccess(res.data.message));
      })
      .catch(() => dispatch(formActionCreators.setSendError('Error. Make sure you provide correct data and try again!')));
  }
}

const deleteAccount = (token) => {
  const url = `${api.user.url}/me`;
  const config = REDUX_UTILS.generateAuthConfig(token);

  return dispatch => {
    dispatch(formActionCreators.startSending());
    return axios.delete(url, config)
      .then((res) => {
        dispatch(formActionCreators.setSendSuccess(res.data.message));
        dispatch(actionCreators.setFetchData({}));
      })
      .catch(() => dispatch(formActionCreators.setSendError('Error. Can not delete your account. Try again later.')));
  }
}

export default {
  fetchData,
  sendReadNews,
  updateUserData,
  updateUserPswd,
  deleteAccount,
};