import { connect } from 'react-redux';
import ComingFilms from './ComingFilms';

import { 
  getFutureMovies, 
  getIsLoading, 
  getIsError,
  fetchFutureMoviesData  
} from '../../../redux/reducers/futureMoviesRedux/futureMoviesRedux';

const mapStateToProps = (state) => ({
  movies: getFutureMovies(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchFutureMoviesData()),
 });

export default connect(mapStateToProps, mapDispatchToProps)(ComingFilms);