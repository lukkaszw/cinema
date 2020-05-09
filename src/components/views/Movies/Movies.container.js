import { connect } from 'react-redux';
import Movies from './Movies';

import { getAllMovies, fetchMoviesData, getIsLoading, getIsError, checkIfDataFetched } from '../../../redux/reducers/moviesRedux/moviesRedux';

const mapStateToProps = (state) => ({
  movies: getAllMovies(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
  dataFetched: checkIfDataFetched(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMoviesData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);