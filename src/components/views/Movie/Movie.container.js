import { connect } from 'react-redux';
import Movie from './Movie';

import { getData, getIsLoading, getIsError, fetchMoviePageData } from '../../../redux/reducers/moviePageRedux/moviePageRedux';

const mapStateToProps = (state) => ({
  data: getData(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieData: (movieId) => dispatch(fetchMoviePageData(movieId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);