import axios from 'axios';
import api from '../../../../config/api';

import actionCreators from '../actionCreators/actionCreators';

const fetchData = (movieId) => {
  const url = `${api.url}/${api.endpoints.movies}/${movieId}`;
  return dispatch => {
    dispatch(actionCreators.startFetching());
    return axios.get(url)
      .then(res => dispatch(actionCreators.setFetchData(res.data)))
      .catch(() => dispatch(actionCreators.setFetchError()));
  }
}

export default {
  fetchData,
};