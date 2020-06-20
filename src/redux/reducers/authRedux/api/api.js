import api from '../../../../config/api';
import axios from 'axios';

import actionCreators from '../actionCreators/actionCreators';
import formActionCreators from '../../formsRedux/actionCreators/actionCreators';
import userActionCreators from '../../userRedux/actionCreators/actionCreators';
import REDUX_UTILS from '../../../utils';


const sendCredentials = (credentials, destination) => {
  
  const url = `${api.auth.url}/${api.auth.endpoints[destination]}`;

  return dispatch => {

    dispatch(formActionCreators.startSending(destination));

    return axios.post(url, credentials)
      .then(res => {
        if(res.data.isError) {
          dispatch(formActionCreators.setSendError(res.data.message))
        } else {
          if(res.data.token) {
            localStorage.setItem('tkn', res.data.token);
            dispatch(actionCreators.login(res.data.token));
          } else {
            dispatch(formActionCreators.setSendSuccess(res.data.message));
          }
        }
      })
      .catch(() => {
        dispatch(formActionCreators.setSendError('Internal server error. Try again later.'))
      });
  }
}

const logoutUser = (token, isFromAllDevices) => {
  return dispatch => {

    localStorage.removeItem('tkn');
    const logoutPath = isFromAllDevices ? api.auth.endpoints.logoutAll : api.auth.endpoints.logout;
    const url = `${api.auth.url}/${logoutPath}`;
    const config = REDUX_UTILS.generateAuthConfig(token);

    dispatch(actionCreators.logout());
    dispatch(userActionCreators.setFetchData({}));
    return axios.post(url, {}, config)
      .then(res => {
        console.log('Logout successfull on the server!');
      })
      .catch(() => console.log('Logout error on the server but you have been successfully logout locally.'));   
  }
}     

export default {
  sendCredentials,
  logoutUser,
};