import api from '../../../../config/api';
import axios from 'axios';
import actionCreators from '../actionCreators/actionCreators';

const fetchShowData = (showId) => {
  const url = `${api.url}/${api.endpoints.schedule}/${showId}`;
  return dispatch => {
    dispatch(actionCreators.startFetching());
    return axios.get(url)
      .then(res => dispatch(actionCreators.setData(res.data)))
      .catch(() => dispatch(actionCreators.setError()));
  }
}

export default {
  fetchShowData,
};