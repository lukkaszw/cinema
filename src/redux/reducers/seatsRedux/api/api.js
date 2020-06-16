import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

const fetchSeats = (showId, token) => {
  const url = `${api.url}/${api.endpoints.seats}/${showId}`;
  const config = {};
  if(token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return dispatch => {
    dispatch(actionCreators.startFetching());
    return axios.get(url, config)
      .then(res => {
        dispatch(actionCreators.updateSeats(res.data));
      })
      .catch(() => dispatch(actionCreators.setFetchError()));
  }
} 

export default {
  fetchSeats,
};