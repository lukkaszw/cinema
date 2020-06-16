import api from '../../../../config/api';
import REDUX_UTILS from '../../../utils';
import actionCreators from '../actionCreators/actionCreators';

const fetchData = () => {
  const url = `${api.url}/${api.endpoints.schedule}`;

  return REDUX_UTILS.fetchData(actionCreators, { url });
}

export default {
  fetchData,
};