import { connect } from 'react-redux';
import FiltersPanel from './FiltersPanel';

import { 
  getAllMoviesFilter, 
  setAllMoviesFilter,
  getSearchText,
  setSearchText,
  setTimeFilter,
  getPlayTimeFilter,
  getSortFilter,
  setSortFilter,
  getGenresFilter,
  toggleGenre,
} from '../../../redux/reducers/moviesRedux/moviesRedux';
import filtersBtns from '../../../config/filtersBtns';
import playTimeBtns from '../../../config/playTimeBtns';

const mapStateToProps = (state) => ({
  inputText: getSearchText(state),
  placeholder: 'Search by title',
  submitInput: e => e.preventDefault(),
  filter: getAllMoviesFilter(state),
  playTime: getPlayTimeFilter(state),
  sort: getSortFilter(state),
  filtersBtns,
  playTimeBtns,
  genres: getGenresFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeInput: e => dispatch(setSearchText(e.target.value)),
  setFilter: (filter) => dispatch(setAllMoviesFilter(filter)),
  setPlayTime: (playTime) => dispatch(setTimeFilter(playTime)),
  setSort: (sort) => dispatch(setSortFilter(sort)),
  toggleGenre: (genre) => dispatch(toggleGenre(genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersPanel);