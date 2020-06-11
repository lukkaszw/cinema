import api from '../../../config/api';
import axios from 'axios';

/* selectors */
export const getIsFetching = ({ show }) => show.loadingData.isActive;
export const getIsError = ({ show }) => show.loadingData.isError;
export const getData = ({ show }) => show.data;
export const getOrderedSeats = ({ show }) => show.seats.seats;
export const getUserSeats = ({ show }) => show.seats.userSeats;

/* action name creators */
const reducerName = 'show';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING_DATA = createActionName('START_FETCHING_DATA');
export const SET_DATA = createActionName('SET_DATA');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_SEATS = createActionName('SET_SEATS');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING_DATA });
export const setData = (payload) => ({ payload, type: SET_DATA });
export const setError = () => ({ type: SET_ERROR });

/* thunk action creators */
export const fetchShowData = (showId) => {
  const url = `${api.url}/${api.endpoints.schedule}/${showId}`;
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url)
      .then(res => dispatch(setData(res.data)))
      .catch(() => dispatch(setError()));
  }
}

const showReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case START_FETCHING_DATA: {
      return {
        ...statePart,
        loadingData: {
          isActive: true,
          isError: false,
        },
      };
    }
    case SET_DATA: {
      return {
        ...statePart,
        data: action.payload,
        loadingData: {
          isActive: false,
          isError: false,
        },
      };
    }
    case SET_ERROR: {
      return {
        ...statePart,
        loadingData: {
          isActive: false,
          isError: true,
        },
      };
    }
    default: 
    return statePart;
  }
};

export default showReducer;