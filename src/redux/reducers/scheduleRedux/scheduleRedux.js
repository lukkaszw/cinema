import axios from 'axios';
import api from '../../../config/api';
/* selectors */
export const getScheduleList = ({ schedule }) => {
  const searchText = schedule.filters.searchText;
  let movies = schedule.data;
  if(searchText) {
    movies = movies.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
  }

  return movies.map(movie => ({
    _id: movie._id,
    title: movie.title,
    categories: movie.categories,
    rate: movie.details.rating,
    img: movie.scheduleImg,
    filters: movie.filters,
    shows: movie.shows,
    duration: movie.duration,
  }));
}
export const getLoading = ({ schedule }) => schedule.loading.isActive;
export const getError = ({ schedule }) => schedule.loading.isError;
export const getPage = ({ schedule }) => schedule.filters.page;
export const getSearchText = ({ schedule }) => schedule.filters.searchText;

/* action name creators */
const reducerName = 'schedule';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING = createActionName('START_FETCHING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_DATA = createActionName('SET_DATA');
export const SET_PAGE = createActionName('SET_PAGE');
export const CHANGE_SEARCH_TEXT = createActionName('CHANGE_SEARCH_TEXT')

/* action creators */
export const startFetching = () => ({ type: START_FETCHING });
export const fetchError = () => ({ type: SET_ERROR });
export const fetchSucceded = (payload) => ({ payload, type: SET_DATA });
export const setPage = (payload) => ({ payload, type: SET_PAGE });
export const changeSearchText = (payload) => ({ payload, type: CHANGE_SEARCH_TEXT });

/* thunk actions creators */
export const fetchSchedule = () => {
  const url = `${api.url}/${api.endpoints.schedule}`;
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url)
      .then(res => dispatch(fetchSucceded(res.data)))
      .catch(() => dispatch(fetchError()));
  }
}

const scheduleReducer = (statePart = {}, action = {}) => {
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
    case SET_PAGE: {
      return {
        ...statePart,
        filters: {
          ...statePart.filters,
          page: action.payload,
        }
      }
    }
    case CHANGE_SEARCH_TEXT: {
      return {
        ...statePart,
        filters: {
          page: 1,
          searchText: action.payload,
        }
      }
    }
    default: 
    return statePart;
  }
};

export default scheduleReducer;