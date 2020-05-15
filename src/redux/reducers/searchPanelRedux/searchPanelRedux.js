import api from '../../../config/api';
import axios from 'axios';

/* selectors */
export const getSearchedMovies = ({ searchPanel }) => searchPanel.data;
export const getIsLoading = ({ searchPanel }) => searchPanel.loading.isActive;
export const getIsError = ({ searchPanel }) => searchPanel.loading.isError;
export const getQuery = ({ searchPanel }) => searchPanel.query;

/* action name creators */
const reducerName = 'search-panel';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_SEARCHING = createActionName('START_SEARCHING');
export const SET_FOUND_DATA = createActionName('SET_FOUND_DATA');
export const SET_ERROR = createActionName('SET_ERROR');
export const RESET_QUERY = createActionName('RESET_QUERY');

/* action creators */
export const startSearching = (searchedTitle) => ({ payload: searchedTitle, type: START_SEARCHING });
export const setFoundData = (data) => ({ payload: data, type: SET_FOUND_DATA });
export const setError = () => ({ type: SET_ERROR });
export const resetQuery = () => ({ type: RESET_QUERY });

/* async action creators */

export const searchMovies = (searchedTitle) => {
  const url = `${api.url}/${api.endpoints.searchMovie}`;
  return dispatch => {
    dispatch(startSearching(searchedTitle));
    return axios.get(url, {
      params: {
        title: searchedTitle,
      }
    })
      .then(res => dispatch(setFoundData(res.data)))
      .catch(() => dispatch(setError()));
  }
}
 
const searchPanelReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case START_SEARCHING: {
      return {
        data: [],
        query: action.payload,
        loading: {
          isActive: true,
          isError: false,
        },
      };
    }
    case SET_FOUND_DATA: {
      return {
        ...statePart,
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
        data: [],
        loading: {
          isActive: false,
          isError: true,
        },
      };
    }
    case RESET_QUERY: {
      return {
        data: [],
        query: '',
        loading: {
          isActive: false,
          isError: false,
        }
      }
    }
    default:  
      return statePart;
  }
}

export default searchPanelReducer;














