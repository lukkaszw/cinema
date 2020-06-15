import { connect } from 'react-redux';
import Order from './Order';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  showData: SELECTORS.show.getData(state),
  userData: SELECTORS.user.getUserData(state),
  isFetchingError: SELECTORS.show.getIsError(state),
  isFetching: SELECTORS.show.getIsFetching(state),
  orderedSeats: SELECTORS.seats.getOrderedSeats(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchShowData: (showId) => dispatch(API.show.fetchShowData(showId)),
  fetchSeats: (showId, token) => dispatch(API.seats.fetchSeats(showId, token)),
  fetchUserData: (token) => dispatch(API.user.fetchUserData(token)),
  updateSeats: (data) => dispatch(ACTION_CREATORS.seats.updateSeats(data)),
  orderTickets: (orderData, token) => dispatch(API.orders.orderTickets(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

