import { connect } from 'react-redux';
import Schedule from './Schedule';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  scheduleList: SELECTORS.schedule.getScheduleList(state),
  isLoading: SELECTORS.schedule.getLoading(state),
  isError: SELECTORS.schedule.getError(state),
  page: SELECTORS.schedule.getPage(state),
  searchText: SELECTORS.schedule.getSearchText(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSchedule: (limit, skip) => dispatch(API.schedule.fetchData(limit, skip)),
  setPage: (pageNr) => dispatch(ACTION_CREATORS.schedule.setPage(pageNr)),
  changeSearchText: (searchText) => dispatch(ACTION_CREATORS.schedule.changeSearchText(searchText)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Schedule);