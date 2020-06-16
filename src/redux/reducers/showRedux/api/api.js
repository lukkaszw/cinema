import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

const fetchData = (showId) => {
  const url = `${api.url}/${api.endpoints.schedule}/${showId}`;
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