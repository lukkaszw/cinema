import { connect } from 'react-redux';
import Movie from './Movie';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';

const mapStateToProps = (state) => ({
  data: SELECTORS.moviePage.getData(state),
  isLoading: SELECTORS.moviePage.getIsLoading(state),
  isError: SELECTORS.moviePage.getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieData: (movieId) => dispatch(API.moviePage.fetchData(movieId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);