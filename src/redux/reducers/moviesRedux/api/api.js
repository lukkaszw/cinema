import axios from 'axios';
import api from '../../../../config/api';
import actionCreators from '../actionCreators/actionCreators';

const fetchMoviesData = () => {
  const url = `${api.url}/${api.endpoints.movies}`;
  return dispatch => {
    dispatch(actionCreators.startFetching());
    return axios.get(url)
      .then(res => dispatch(actionCreators.fetchSucceded(res.data)))
      .catch(() => dispatch(actionCreators.fetchError()));
  }
}

export default {
  fetchMoviesData,
};