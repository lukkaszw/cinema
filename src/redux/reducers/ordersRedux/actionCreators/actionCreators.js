import actions from '../actions/actions';

const setUserOrders = (payload) => ({ payload, type: actions.SET_USER_ORDERS });
const deleteUserOrder = (payload) => ({ payload, type: actions.DELETE_USER_ORDER });
const setOrderToEdit = (payload) => ({ payload, type: actions.SET_ORDER_TO_EDIT });
const updateUserOrder = (payload) => ({ payload, type: actions.UPDATE_USER_ORDER});

export default {
  setUserOrders,
  deleteUserOrder,
  setOrderToEdit,
  updateUserOrder,
};