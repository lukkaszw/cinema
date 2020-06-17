import api from '../../../../config/api';
import REDUX_UTILS from '../../../utils';
import actionCreators from '../actionCreators/actionCreators';

const searchMovies = (searchedTitle) => {
  const url = `${api.url}/${api.endpoints.searchMovie}`;
  const config = {
    params: {
      title: searchedTitle,
    },
  };

  return REDUX_UTILS.fetchData(actionCreators, { url, config }, searchedTitle);
}

export default {
  searchMovies,
};