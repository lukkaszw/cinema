import { connect } from 'react-redux';
import Schedule from './Schedule';
import { fetchSchedule , getScheduleList, getLoading, getError, setPage, getPage, getSearchText, changeSearchText } from '../../../redux/reducers/scheduleRedux/scheduleRedux';

const mapStateToProps = (state) => ({
  scheduleList: getScheduleList(state),
  isLoading: getLoading(state),
  isError: getError(state),
  page: getPage(state),
  searchText: getSearchText(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSchedule: (limit, skip) => dispatch(fetchSchedule(limit, skip)),
  setPage: (pageNr) => dispatch(setPage(pageNr)),
  changeSearchText: (searchText) => dispatch(changeSearchText(searchText)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Schedule);