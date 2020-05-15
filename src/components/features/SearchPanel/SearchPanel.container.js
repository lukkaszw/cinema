import { connect } from 'react-redux';
import SearchPanel from './SearchPanel';
import {
  getSearchedMovies,
  getIsLoading,
  getIsError,
  searchMovies,
  getQuery,
  resetQuery,
} from '../../../redux/reducers/searchPanelRedux/searchPanelRedux';

const mapStateToProps = (state) => ({
  movies: getSearchedMovies(state),
  isLoading: getIsLoading(state),
  isError: getIsError(state),
  query: getQuery(state),
});

const mapDispatchToProps = (dispatch) => ({
  searchMovies: (searchedTitle) => dispatch(searchMovies(searchedTitle)),
  resetQuery: () => dispatch(resetQuery()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);