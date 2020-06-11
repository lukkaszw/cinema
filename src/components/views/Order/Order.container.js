import { connect } from 'react-redux';
import Order from './Order';
import { getToken } from '../../../redux/reducers/authRedux/authRedux';
import { fetchUserData, getUserData } from '../../../redux/reducers/userRedux/userRedux';
import { 
  fetchShowData, 
  getIsFetching, 
  getIsError, 
  getData } from '../../../redux/reducers/showRedux/showRedux';
import {
  fetchSeats,
  updateSeats,
  getOrderedSeats,
} from '../../../redux/reducers/seatsRedux/seatsRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
  showData: getData(state),
  userData: getUserData(state),
  isFetchingError: getIsError(state),
  isFetching: getIsFetching(state),
  orderedSeats: getOrderedSeats(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchShowData: (showId) => dispatch(fetchShowData(showId)),
  fetchSeats: (showId, token) => dispatch(fetchSeats(showId, token)),
  fetchUserData: (token) => dispatch(fetchUserData(token)),
  updateSeats: (data) => dispatch(updateSeats(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

