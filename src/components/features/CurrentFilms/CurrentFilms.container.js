import { connect } from 'react-redux';
import CurrentFilms from './CurrentFilms';
import { getAllMovies, getIsLoading, fetchMoviesData, getFilter, setFilter  } from '../../../redux/reducers/moviesRedux/moviesRedux';

const mapStateToProps = (state) => ({
  movies: getAllMovies(state),
  isLoading: getIsLoading(state),
  filter: getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMoviesData()),
  setFilter: (filter) => dispatch(setFilter(filter)),
 });

export default connect(mapStateToProps, mapDispatchToProps)(CurrentFilms);