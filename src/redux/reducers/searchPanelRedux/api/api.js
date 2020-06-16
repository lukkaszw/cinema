import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

const searchMovies = (searchedTitle) => {
  const url = `${api.url}/${api.endpoints.searchMovie}`;
  return dispatch => {
    dispatch(actionCreators.startSearching(searchedTitle));
    return axios.get(url, {
      params: {
        title: searchedTitle,
      }
    })
      .then(res => dispatch(actionCreators.setFetchData(res.data)))
      .catch(() => dispatch(actionCreators.setFetchError()));
  }
}

export default {
  searchMovies,
};