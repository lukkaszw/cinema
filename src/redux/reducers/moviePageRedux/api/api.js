import api from '../../../../config/api';
import REDUX_UTILS from '../../../utils';
import actionCreators from '../actionCreators/actionCreators';

const fetchData = (movieId) => {
  const url = `${api.url}/${api.endpoints.movies}/${movieId}`;

  return REDUX_UTILS.fetchData(actionCreators, { url });
}

export default {
  fetchData,
};