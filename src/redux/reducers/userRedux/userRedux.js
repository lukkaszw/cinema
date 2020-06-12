import api from '../../../config/api';
import axios from 'axios';
import {
  startSending,
  setError as setFormError,
  setSuccess,
} from '../formsRedux/formsRedux';
import { setUserOrders } from '../ordersRedux/ordersRedux';

/* selectors */
export const getIsLoading = ({ user }) => user.loading.isActive;
export const getIsError = ({ user }) => user.loading.isError;
export const getUserData = ({ user }) => user.data;
export const getNews = ({ user }) => user.data.news || [];

/* action name creators */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING = createActionName('START_FETCHING');
export const SET_DATA = createActionName('SET_DATA');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_NEWS_AS_READ = createActionName('SET_NEWS_AS_READ');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING });
export const setData = (payload) => ({ payload, type: SET_DATA });
export const setError = () => ({ type: SET_ERROR });
export const setNewsAsRead = (payload) => ({ payload, type: SET_NEWS_AS_READ });


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
      .then(res => {
        const userOrders = res.data.orders;
        const data = res.data;
        delete data.orders;
        dispatch(setData(data));
        dispatch(setUserOrders(userOrders));
      })
      .catch(() => dispatch(setError()));
  }
}

export const sendReadNews = (token, newsId) => {
  const url = `${api.news.url}/${newsId}`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    return axios.patch(url, {}, { headers: { 'Authorization': AuthString }})
      .then(() => {
        dispatch(setNewsAsRead(newsId));
      })
      .catch(() => console.error('Error - cannot save news as read!'));
  }
}

export const updateUserData = (token, data) => {
  const url = `${api.user.url}/${api.user.endpoints.data}`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    dispatch(startSending());
    return axios.put(url, data, { headers: { 'Authorization': AuthString }})
      .then((res) => {
        dispatch(setSuccess(res.data.message));
        dispatch(setData(res.data.userData));
      })
      .catch(() => dispatch(setFormError('Error. Try again later!')));
  }
}

export const updateUserPswd = (token, data) => {
  const url = `${api.user.url}/${api.user.endpoints.pswd}`;
  const AuthString = `Bearer ${token}`;

  return dispatch => {
    dispatch(startSending());
    return axios.patch(url, data, { headers: { 'Authorization': AuthString }})
      .then((res) => {
        dispatch(setSuccess(res.data.message));
      })
      .catch(() => dispatch(setFormError('Error. Make sure you provide correct data and try again!')));
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
    case SET_NEWS_AS_READ: {
      return {
        ...statePart,
        data: {
          ...statePart.data,
          news: statePart.data.news.map(oneNews => {
            if(oneNews._id === action.payload) {
              oneNews.isRead = true;
            }
            return oneNews;
          }),
        },
      };
    }
    default: 
      return statePart;
  }
};

export default userReducer;