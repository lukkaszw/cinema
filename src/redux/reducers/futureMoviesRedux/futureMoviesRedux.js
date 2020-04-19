import axios from 'axios';
import api from '../../../config/api';

/* selectors */
export const getFutureMovies = ({ futureMovies }) => futureMovies.data;
export const getIsLoading = ({ futureMovies }) => futureMovies.loading.isActive;
export const getIsError = ({ futureMovies }) => futureMovies.loading.isError;

/* action name creators */
const reducerName = 'future-movies';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING = createActionName('START_FETCHING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_DATA = createActionName('SET_DATA');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING });
export const fetchError = () => ({ type: SET_ERROR });
export const fetchSucceded = (payload) => ({ payload, type: SET_DATA });

/* thunk actions creators */
export const fetchFutureMoviesData = () => {
  const url = `${api.url}/${api.endpoints.futureMovies}`;
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url)
      .then(res => dispatch(fetchSucceded(res.data)))
      .catch(() => dispatch(fetchError()));
  }
}


const futureMoviesReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isActive: true,
          isError: false,
        }
      }
    }
    case SET_ERROR: {
      return {
        ...statePart,
        loading: {
          isError: true,
          isActive: false,
        }
      }
    }
    case SET_DATA: {
    
      return {
        data: action.payload,
        loading: {
          isError: false,
          isActive: false,
        }
      }
    }
    default: {
      return statePart;
    }
  }
}

export default futureMoviesReducer;