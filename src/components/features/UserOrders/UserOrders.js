import React, { Component } from 'react';
import OrderItem from '../../common/OrderItem/OrderItem';
import PropTypes from 'prop-types';
import styles from './UserOrders.module.scss';

class UserOrders extends Component  {
  state = {
    activeOrder: null,
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

  handleEdit = (orderId) => {
    console.log(orderId);
  }

  handleDelete = (orderId) => {
    console.log(orderId);
  }


  render() {
    const { activeOrder } = this.state;
    const { orders } = this.props;
    const { handleToggleOrder, handleDelete, handleEdit } = this;

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
                onDelete={() => handleDelete(order._id)}
                onEdit={() => handleEdit(order._id)}
              />
            ))
          }
        </ul>
      </div>
    
     );
  }

}

UserOrders.propTypes = {
  orders: PropTypes.array.isRequired,
};
 
export default UserOrders;