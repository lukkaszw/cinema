import axios from 'axios';
import api from '../../../config/api';
/* selectors */
export const getAllMovies = ({ movies }) => movies.data;
export const getIsLoading = ({ movies }) => movies.loading.isActive;
export const getCount = ({ movies }) => movies.count;

/* action name creators */
const reducerName = 'movies';
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
export const fetchMoviesData = () => {
  const url = `${api.url}/${api.endpoints.movies}`;
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url)
      .then(res => dispatch(fetchSucceded(res.data)))
      .catch(() => dispatch(fetchError()));
  }
}

const moviesReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isError: false,
          isActive: true,
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
        count: action.payload.length,
        loading: {
          isError: false,
          isActive: false,
        }
      }
    }
    default: 
    return statePart;
  }
};

export default moviesReducer;