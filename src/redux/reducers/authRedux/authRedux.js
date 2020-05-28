import api from '../../../config/api';
import axios from 'axios';

import { 
  startSending,
  setError,
  setSuccess, 
} from '../formsRedux/formsRedux';

import {
  setData
} from '../userRedux/userRedux';

/* selectors */
export const getIsAuthenticated = ({ auth }) => !!auth.token;
export const getToken = ({ auth }) => auth.token;


/* action name creators */
const reducerName = 'auth';
const createActionName = name => `app/${reducerName}/${name}`;


/* action types */
export const LOGIN = createActionName('LOGIN');
export const LOGOUT = createActionName('LOGOUT');

/* action creators */
export const login = (payload) => ({ payload, type: LOGIN });
export const logout = () => ({ type: LOGOUT });


/* thunk actions creators */
export const sendCredentials = (credentials, destination) => {
  
  const url = `${api.auth.url}/${api.auth.endpoints[destination]}`;

  return dispatch => {

    dispatch(startSending(destination));

    return axios.post(url, credentials)
      .then(res => {
        if(res.data.isError) {
          dispatch(setError(res.data.message))
        } else {
          if(res.data.token) {
            localStorage.setItem('tkn', res.data.token);
            dispatch(login(res.data.token));
          } else {
            dispatch(setSuccess(res.data.message));
          }
        }
      })
      .catch(() => {
        dispatch(setError('Internal server error. Try again later.'))
      });
  }
}

export const logoutUser = (token, isFromAllDevices) => {
  return dispatch => {

    localStorage.removeItem('tkn');
    const logoutPath = isFromAllDevices ? api.auth.endpoints.logoutAll : api.auth.endpoints.logout;
    const url = `${api.auth.url}/${logoutPath}`;
    const AuthStr = `Bearer ${token}`;

    dispatch(logout());
    dispatch(setData({}));
    return axios.post(url, {}, { headers: { 'Authorization': AuthStr }})
      .then(res => {
        console.log('Logout successfull on the server!');
      })
      .catch(() => console.log('Logout error on the server but you have been successfully logout locally.'));   
  }
}     

export const checkStartAuthStatus = () => {
  return dispatch => {

    const token = localStorage.getItem('tkn');
    if(token) {
      dispatch(login(token));
    }
    return;
  }
}



const authReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case LOGIN: {
      return {
        token: action.payload,
      };
    }
    case LOGOUT: {
      return {
        token: null,
      };
    }
    default: 
      return statePart;
  }
};

export default authReducer;