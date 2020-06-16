import api from '../../../../config/api';
import REDUX_UTILS from '../../../utils';
import actionCreators from '../actionCreators/actionCreators';

const fetchData = (showId) => {
  const url = `${api.url}/${api.endpoints.seats}/${showId}`;
  
  return REDUX_UTILS.fetchData(actionCreators, { url });
} 

export default {
  fetchData,
};