import { connect } from 'react-redux';
import UserOrders from './UserOrders';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  orders: SELECTORS.orders.getUserOrders(state),
  token: SELECTORS.auth.getToken(state),
  isDeleting: SELECTORS.forms.getIsSending(state),
  isDeleleteError: SELECTORS.forms.getIsError(state),
  isDeleteSuccess: SELECTORS.forms.getIsSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrder: (orderId, token) => dispatch(API.orders.deleteOrder(orderId, token)),
  resetForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
  setOrderToEdit: (orderId) => dispatch(ACTION_CREATORS.orders.setOrderToEdit(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);