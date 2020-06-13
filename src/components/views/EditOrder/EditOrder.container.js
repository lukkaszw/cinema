import { connect } from 'react-redux';
import EditOrder from './EditOrder';
import { getToken } from '../../../redux/reducers/authRedux/authRedux';
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
import {
  getEditingOrderUser, 
  getEditingOrder,
  editOrder,
  getEditingOrderId,
} from '../../../redux/reducers/ordersRedux/ordersRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
  showData: getData(state),
  userData: getEditingOrderUser(state),
  isFetchingError: getIsError(state),
  isFetching: getIsFetching(state),
  orderedSeats: getOrderedSeats(state),
  orderToEdit: getEditingOrder(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchShowData: (showId) => dispatch(fetchShowData(showId)),
  fetchSeats: (showId, token) => dispatch(fetchSeats(showId, token)),
  updateSeats: (data) => dispatch(updateSeats(data)),
  editOrder: (orderData, token, editingId) => dispatch(editOrder(orderData, token, editingId)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);