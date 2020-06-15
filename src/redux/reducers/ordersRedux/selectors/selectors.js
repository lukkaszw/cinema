const getUserOrders = ({ orders }) => orders.userOrders;
const getEditingOrder = ({ orders }) => orders.userOrders.find(order => order._id === orders.orderToEdit);
const getEditingOrderUser = ({ orders }) => {
  const order = getEditingOrder({ orders });
  if(order) {
    return {
      name: order.name,
      surname: order.surname,
      phone: order.phone,
      email: order.email,
    };
  }
  return {};
}

export default {
  getUserOrders,
  getEditingOrder,
  getEditingOrderUser,
}