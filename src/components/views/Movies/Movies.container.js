import { connect } from 'react-redux';
import Movies from './Movies';

import SELECTORS from '../../../redux/selectors';
import ACTION_CREATORS from '../../../redux/actionCreators';
import API from '../../../redux/api';
  
const mapStateToProps = (state) => ({
  movies: SELECTORS.movies.getAllMovies(state),
  isLoading: SELECTORS.movies.getIsLoading(state),
  isError: SELECTORS.movies.getIsError(state),
  dataFetched: SELECTORS.movies.checkIfDataFetched(state),
  page: SELECTORS.movies.getAllMoviesPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(API.movies.fetchData()),
  setPage: (payload) => dispatch(ACTION_CREATORS.movies.setPage(payload)),
  resetFilters: () => dispatch(ACTION_CREATORS.movies.resetAllMoviesFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);