import { connect } from 'react-redux';
import EditOrder from './EditOrder';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  showData: SELECTORS.show.getData(state),
  userData: SELECTORS.orders.getEditingOrderUser(state),
  isFetchingError: SELECTORS.show.getIsError(state),
  isFetching: SELECTORS.show.getIsFetching(state),
  orderedSeats: SELECTORS.seats.getOrderedSeats(state),
  orderToEdit: SELECTORS.orders.getEditingOrder(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchShowData: (showId) => dispatch(API.show.fetchData(showId)),
  fetchSeats: (showId, token) => dispatch(API.seats.fetchData(showId, token)),
  updateSeats: (data) => dispatch(ACTION_CREATORS.seats.setFetchData(data)),
  editOrder: (orderData, token, editingId) => dispatch(API.orders.editOrder(orderData, token, editingId)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);