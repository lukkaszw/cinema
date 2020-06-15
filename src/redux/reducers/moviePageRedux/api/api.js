import axios from 'axios';
import api from '../../../../config/api';

import actionCreators from '../actionCreators/actionCreators';

const fetchMoviePageData = (movieId) => {
  const url = `${api.url}/${api.endpoints.movies}/${movieId}`;
  return dispatch => {
    dispatch(actionCreators.startFetching());
    return axios.get(url)
      .then(res => dispatch(actionCreators.setData(res.data)))
      .catch(() => dispatch(actionCreators.setError()));
  }
}

export default {
  fetchMoviePageData,
};