import { connect } from 'react-redux';
import Home from './Home';
import { 
  getCurrentMovies, 
  getSoonMovies, 
  getCurrentMoviesFilter, 
  getIsLoading, 
  setCurrentMoviesFilter,
  fetchMoviesData, 
  getIsError} from '../../../redux/reducers/moviesRedux/moviesRedux';

const mapStateToProps = (state) => ({
  currentMovies: getCurrentMovies(state),
  soonMovies: getSoonMovies(state),
  filter: getCurrentMoviesFilter(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMoviesData()),
  setFilter: (filter) => dispatch(setCurrentMoviesFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);