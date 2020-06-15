import { connect } from 'react-redux';
import FiltersPanel from './FiltersPanel';

import filtersBtns from '../../../config/filtersBtns';
import playTimeBtns from '../../../config/playTimeBtns';
import SELECTORS from '../../../redux/selectors';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  inputText: SELECTORS.movies.getSearchText(state),
  placeholder: 'Search by title',
  submitInput: e => e.preventDefault(),
  filter: SELECTORS.movies.getAllMoviesFilter(state),
  playTime: SELECTORS.movies.getPlayTimeFilter(state),
  sort: SELECTORS.movies.getSortFilter(state),
  filtersBtns,
  playTimeBtns,
  genres: SELECTORS.movies.getGenresFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeInput: e => dispatch(ACTION_CREATORS.movies.setSearchText(e.target.value)),
  setFilter: (filter) => dispatch(ACTION_CREATORS.movies.setAllMoviesFilter(filter)),
  setPlayTime: (playTime) => dispatch(ACTION_CREATORS.movies.setTimeFilter(playTime)),
  setSort: (sort) => dispatch(ACTION_CREATORS.movies.setSortFilter(sort)),
  toggleGenre: (genre) => dispatch(ACTION_CREATORS.movies.toggleGenre(genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersPanel);