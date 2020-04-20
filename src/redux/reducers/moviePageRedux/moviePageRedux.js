import axios from 'axios';
import api from '../../../config/api';
/* selectors */
export const getData = ({ moviePage }) => moviePage.data;
export const getIsLoading = ({ moviePage }) => moviePage.loading.isActive;
export const getIsError = ({ moviePage }) => moviePage.loading.isError;

/* action name creators */
const reducerName = 'movie-page';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_LOADING = createActionName('START_LOADING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_DATA = createActionName('SET_DATA');

/* action creators */
export const startFetching = () => ({ type: START_LOADING });
export const setError = () => ({ type: SET_ERROR });
export const setData = (payload) => ({ payload, type: SET_DATA });

/* thunk actions creators */
export const fetchMoviePageData = (movieId) => {
  const url = `${api.url}/${api.endpoints.movies}/${movieId}`;
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url)
      .then(res => dispatch(setData(res.data)))
      .catch(() => dispatch(setError()));
  }
}

const moviePageReducer = (statePart = {}, action = {}) => {
    switch(action.type) {
      case START_LOADING: {
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
            isActive: false,
            isError: true,
          }
        }
      }
      case SET_DATA: {
        return {
          data: action.payload,
          loading: {
            isActive: false,
            isError: false,
          }
        }
      }
      default: 
        return statePart;
    }
};

export default moviePageReducer;