import api from '../../../config/api';
import axios from 'axios';

/* selectors */
export const getOrderedSeats = ({ seats }) => seats.data;
export const getIsSeatsFetching = ({ seats }) => seats.loading.isActive;
export const getIsSeatsError = ({ seats }) => seats.loading.isError;

/* action name creators */
const reducerName = 'seats';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING_SEATS = createActionName('START_FETCHING_SEATS');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_DATA = createActionName('SET_DATA');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING_SEATS });
export const setError = () => ({ type: SET_ERROR });
export const updateSeats = (payload) => ({ payload, type: SET_DATA });


export const fetchSeats = (showId, token) => {
  const url = `${api.url}/${api.endpoints.seats}/${showId}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url, config)
      .then(res => {
        dispatch(updateSeats(res.data));
      })
      .catch(() => dispatch(setError()));
  }
} 

const seatsReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case START_FETCHING_SEATS: {
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

export default seatsReducer;