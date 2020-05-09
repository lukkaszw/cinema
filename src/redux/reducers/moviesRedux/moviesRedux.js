import axios from 'axios';
import api from '../../../config/api';
/* selectors */
export const getAllMovies = ({ movies }) => {
  const filterCat = movies.filters.all;
  if(filterCat === 'all') return movies.data;
  return movies.data
    .filter(movie => {
      if(movie.filters) {
        return movie.filters.includes(filterCat);
      }
      return false;
    });
};
export const getCurrentMovies = ({ movies }) => {
  const currentMovies = movies.data.filter(movie => movie.played === 'current');
  const crntFilter = movies.filters.current;
  if(crntFilter === 'all') {
    return currentMovies;
  }
  return currentMovies.filter(movie => movie.filters.includes(crntFilter));
}
export const getSoonMovies = ({ movies }) => movies.data.filter(movie => movie.played === 'soon');
export const getIsLoading = ({ movies }) => movies.loading.isActive;
export const getAllMoviesFilter = ({ movies }) => movies.filters.all;
export const getCurrentMoviesFilter = ({ movies }) => movies.filters.current;
export const getIsError = ({ movies }) => movies.loading.isError;

/* action name creators */
const reducerName = 'movies';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING = createActionName('START_FETCHING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_DATA = createActionName('SET_DATA');
export const SET_ALL_FILTER = createActionName('SET_FILTER');
export const SET_CURRENT_FILTER = createActionName('SET_CURRENT_FILTER');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING });
export const fetchError = () => ({ type: SET_ERROR });
export const fetchSucceded = (payload) => ({ payload, type: SET_DATA });
export const setAllMoviesFilter = (payload) => ({payload, type: SET_ALL_FILTER });
export const setCurrentMoviesFilter = (payload) => ({ payload, type: SET_CURRENT_FILTER })

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
        ...statePart,
        data: action.payload,
        loading: {
          isError: false,
          isActive: false,
        }
      }
    }
    case SET_ALL_FILTER: {
      return {
        ...statePart,
        filters: {
          ...statePart.filters,
          all: action.payload,
        }
      } 
    }
    case SET_CURRENT_FILTER: {
      return {
        ...statePart,
        filters: {
          ...statePart.filters,
          current: action.payload,
        }
      }
    }
    default: 
    return statePart;
  }
};

export default moviesReducer;