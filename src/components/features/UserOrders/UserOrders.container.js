import { connect } from 'react-redux';
import UserOrders from './UserOrders';

import { deleteOrder, getUserOrders, setOrderToEdit } from '../../../redux/reducers/ordersRedux/ordersRedux';
import { getToken } from '../../../redux/reducers/authRedux/authRedux';
import { getIsSending, getIsError, getIsSuccess, resetAll } from '../../../redux/reducers/formsRedux/formsRedux';


const mapStateToProps = (state) => ({
  orders: getUserOrders(state),
  token: getToken(state),
  isDeleting: getIsSending(state),
  isDeleleteError: getIsError(state),
  isDeleteSuccess: getIsSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrder: (orderId, token) => dispatch(deleteOrder(orderId, token)),
  resetForm: () => dispatch(resetAll()),
  setOrderToEdit: (orderId) => dispatch(setOrderToEdit(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);