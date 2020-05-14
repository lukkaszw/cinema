import { connect } from 'react-redux';
import Movies from './Movies';

import { 
  getAllMovies, 
  fetchMoviesData, 
  getIsLoading, 
  getIsError, 
  checkIfDataFetched,  
  getAllMoviesPage,
  setPage,
  resetAllMoviesFilters, } from '../../../redux/reducers/moviesRedux/moviesRedux';

  
const mapStateToProps = (state) => ({
  movies: getAllMovies(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
  dataFetched: checkIfDataFetched(state),
  page: getAllMoviesPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMoviesData()),
  setPage: (payload) => dispatch(setPage(payload)),
  resetFilters: () => dispatch(resetAllMoviesFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);