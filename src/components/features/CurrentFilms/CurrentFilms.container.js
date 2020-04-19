import { connect } from 'react-redux';
import CurrentFilms from './CurrentFilms';
import { getAllMovies, getIsLoading, fetchMoviesData  } from '../../../redux/reducers/moviesRedux/moviesRedux';

const mapStateToProps = (state) => ({
  movies: getAllMovies(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMoviesData()),
 });

export default connect(mapStateToProps, mapDispatchToProps)(CurrentFilms);