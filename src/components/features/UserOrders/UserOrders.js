import React, { Component } from 'react';
import OrderItem from '../../common/OrderItem/OrderItem';
import DeleteOrderModal from './DeleteOrderModal/DeleteOrderModal';
import PropTypes from 'prop-types';
import styles from './UserOrders.module.scss';

class UserOrders extends Component  {
  state = {
    activeOrder: null,
    orderToDelete: null,
  }

  componentWillUnmount() {
    this.props.resetForm();
  }
  
  handleToggleOrder = (orderId) => {
    this.setState(prevState => {
      const isActive = prevState.activeOrder === orderId;
      if(isActive) {
        window.location.hash = '';
      }
      
      return ({
        activeOrder: isActive ? null : orderId,
      })
    });
  }

  handleEdit = (orderId, showId) => {
    this.props.setOrderToEdit(orderId);
    this.props.history.push(`/order/edit/${showId}`);
  }

  handleDeleting = (orderId) => {
    this.setState({
      orderToDelete: orderId,
    });
  }

  handleCancelDeleting = () => {
    this.setState({
      orderToDelete: null,
    });
    this.props.resetForm();
  }

  handleConfirmDeleting = () => {
    const orderId = this.state.orderToDelete;
    const token = this.props.token;
    this.props.deleteOrder(orderId, token);
  }


  render() {
    const { activeOrder, orderToDelete } = this.state;
    const { 
      orders,
      isDeleting,
      isDeleleteError,
      isDeleteSuccess } = this.props;
    const { 
      handleToggleOrder, 
      handleDeleting, 
      handleEdit,
      handleConfirmDeleting,
      handleCancelDeleting } = this;

    return ( 
      <div className={styles.root}>
        {
          orders.length === 0 &&
            <p className={styles.message}>
              No orders found!
            </p>
        }
        <ul className={styles.list}>
          {
            orders.map(order => (
              <OrderItem 
                key={order._id}
                {...order}
                isActive={activeOrder === order._id}
                onToggleActive={() => handleToggleOrder(order._id)}
                onDelete={() => handleDeleting(order._id)}
                onEdit={() => handleEdit(order._id, order.showId._id)}
              />
            ))
          }
        </ul>
        {
          orderToDelete &&
            <DeleteOrderModal 
              onCancel={handleCancelDeleting}
              onConfirm={handleConfirmDeleting}
              isSending={isDeleting}
              isError={isDeleleteError}
              isSuccess={isDeleteSuccess}
            />
        }
      </div>
    
     );
  }

}

UserOrders.propTypes = {
  orders: PropTypes.array.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isDeleleteError: PropTypes.bool.isRequired,
  isDeleteSuccess: PropTypes.bool.isRequired,
};
 
export default UserOrders;