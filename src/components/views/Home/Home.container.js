import { connect } from 'react-redux';
import Home from './Home';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  currentMovies: SELECTORS.movies.getCurrentMovies(state),
  soonMovies: SELECTORS.movies.getSoonMovies(state),
  filter: SELECTORS.movies.getCurrentMoviesFilter(state),
  isLoading: SELECTORS.movies.getIsLoading(state),
  isError: SELECTORS.movies.getIsError(state),
  dataFetched: SELECTORS.movies.checkIfDataFetched(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(API.movies.fetchMoviesData()),
  setFilter: (filter) => dispatch(ACTION_CREATORS.movies.setCurrentMoviesFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);