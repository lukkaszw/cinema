import actions from './actions/actions';

const ordersReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.SET_USER_ORDERS: {
      return {
        ...statePart,
        userOrders: action.payload,
      };
    }
    case actions.SET_ORDER_TO_EDIT: {
      return {
        ...statePart,
        orderToEdit: action.payload,
      }
    }
    case actions.DELETE_USER_ORDER: {
      return {
        ...statePart,
        userOrders: statePart.userOrders.filter(order => order._id !== action.payload),
      }
    }
    case actions.UPDATE_USER_ORDER: {
      return {
        ...statePart,
        userOrders: statePart.userOrders.map(order => {
          if(order._id === action.payload._id) {
            order = action.payload;
          }
          return order;
        }),
      }
    }
    default: 
    return statePart;
  }
};

export default ordersReducer;