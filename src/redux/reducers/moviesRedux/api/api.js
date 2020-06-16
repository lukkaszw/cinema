import REDUX_UTILS from '../../../utils';
import api from '../../../../config/api';
import actionCreators from '../actionCreators/actionCreators';

const fetchData = () => {
  const url = `${api.url}/${api.endpoints.movies}`;

  return REDUX_UTILS.fetchData(actionCreators, { url });
}

export default {
  fetchData,
};