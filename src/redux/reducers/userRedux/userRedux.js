import api from '../../../config/api';
import axios from 'axios';

/* selectors */
export const getIsLoading = ({ user }) => user.loading.isActive;
export const getIsError = ({ user }) => user.loading.isError;
export const getUserData = ({ user }) => user.data;

/* action name creators */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING = createActionName('START_FETCHING');
export const SET_DATA = createActionName('SET_DATA');
export const SET_ERROR = createActionName('SET_ERROR');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING });
export const setData = (payload) => ({ payload, type: SET_DATA });
export const setError = () => ({ type: SET_ERROR });

/* thunk actions creators */
export const fetchUserData = (token) => {
  const url = `${api.user.url}/${api.user.endpoints.data}`;

  return dispatch => {
    if(!token) {
      dispatch(setError());
      return;
    } 
    const AuthString = `Bearer ${token}`;
    dispatch(startFetching());
    return axios.get(url, { headers: { 'Authorization': AuthString } })
      .then(res =>{
        dispatch(setData(res.data));
      })
      .catch(() => dispatch(setError()));
  }
}


const userReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isActive: true,
          isError: false,
        },
      };
    }
    case SET_DATA: {
      return {
        data: action.payload,
        loading: {
          isActive: false,
          isError: false,
        },
      };
    }
    case SET_ERROR: {
      return {
        ...statePart,
        loading: {
          isActive: false,
          isError: true,
        },
      };
    }
    default: 
      return statePart;
  }
};

export default userReducer;