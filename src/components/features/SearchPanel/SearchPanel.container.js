import { connect } from 'react-redux';
import SearchPanel from './SearchPanel';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CRAETORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  movies: SELECTORS.searchPanel.getSearchedMovies(state),
  isLoading: SELECTORS.searchPanel.getIsLoading(state),
  isError: SELECTORS.searchPanel.getIsError(state),
  query: SELECTORS.searchPanel.getQuery(state),
});

const mapDispatchToProps = (dispatch) => ({
  searchMovies: (searchedTitle) => dispatch(API.searchPanel.searchMovies(searchedTitle)),
  resetQuery: () => dispatch(ACTION_CRAETORS.searchPanel.resetQuery()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);