import React from 'react';
import { shallow } from 'enzyme';
import UserOrders from './UserOrders';

const mockedProps = {
  orders: [],
  token: 'someToken',
  isDeleting: false,
  isDeleleteError: false,
  isDeleteSuccess: false,
  deleteOrder: jest.fn(),
  resetForm: jest.fn(),
  price: 10,
};

const propsWithOrders = {
  ...mockedProps,
  orders: [
    {
      _id: '1',
      seats: ['2A', '3B'],
      name: 'Name1',
      surname: 'Surname1',
      email: 'email1@wp.pl',
      phone: '555 555 555',
      showId: {},
      price: 20,
    },
    {
      _id: '2',
      seats: ['3D', '7C'],
      name: 'Name2',
      surname: 'Surname2',
      email: 'email2@wp.pl',
      phone: '666 666 666',
      showId: {},
      price: 24,
    }
  ]
}

const componentWithoutOrders = shallow(<UserOrders {...mockedProps} />);
const componentWithOrders = shallow(<UserOrders {...propsWithOrders} />);

describe('UserSettings component', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      expect(componentWithOrders).toBeTruthy();
      expect(componentWithoutOrders).toBeTruthy();
    });
  
    it('renders message when it has no orders', () => {
      const msgEl = componentWithoutOrders.find('.message');
      expect(msgEl.exists()).toBeTruthy();
      expect(msgEl.text()).toBe('No orders found!');
    });
  
    it('does not render message when it has orders', () => {
      const msgEl = componentWithOrders.find('.message');
      expect(msgEl.exists()).toBeFalsy();
    });
  
    it(`renders list of ${propsWithOrders.orders.length} orders`, () => {
      const orderEl = componentWithOrders.find('.list OrderItem');
      expect(orderEl.length).toBe(propsWithOrders.orders.length);
    });

    it('does not render DeleteOrderModal by default', () => {
      const delModalEl = componentWithOrders.find('DeleteOrderModal');
      expect(delModalEl.exists()).toBeFalsy()
    });

    it('renders DeleteOrderModal with proper props when user is going to delete order', () => {
      const instance = componentWithOrders.instance();
      const ordersId = propsWithOrders.orders[0]._id;
      instance.handleDeleting(ordersId);
      const delModalEl = componentWithOrders.find('DeleteOrderModal');
      expect(delModalEl.exists()).toBeTruthy();
      expect(delModalEl.props()).toEqual({
        onCancel: instance.handleCancelDeleting,
        onConfirm: instance.handleConfirmDeleting,
        isSending: propsWithOrders.isDeleting,
        isError: propsWithOrders.isDeleleteError,
        isSuccess: propsWithOrders.isDeleteSuccess,
      });
    });
  });

  describe('functionality', () => {
    let component;

    beforeEach(() => {
      component = shallow(<UserOrders {...propsWithOrders} />);
    });

    it('starts with no active order', () => {
      expect(component.state('activeOrder')).toEqual(null);
    });

    it('changes active order properly', () => {
      const instance = component.instance();
      const firstId = '1';
      const secondId = '2';

      //click on first
      instance.handleToggleOrder(firstId);
      expect(instance.state.activeOrder).toBe(firstId);
      //click on first again
      instance.handleToggleOrder(firstId);
      expect(instance.state.activeOrder).toBe(null);
      //click on second
      instance.handleToggleOrder(secondId);
      expect(instance.state.activeOrder).toBe(secondId);
      //click on first again
      instance.handleToggleOrder(firstId);
      expect(instance.state.activeOrder).toBe(firstId);
    });

    it('deletes order properly', () => {
      const instance = component.instance();
      expect(instance.state.orderToDelete).toEqual(null);
      const orderId = propsWithOrders.orders[0]._id;
      instance.handleDeleting(orderId);
      expect(instance.state.orderToDelete).toBe(orderId);
      //check the deleteOrder function from redux
      expect(propsWithOrders.deleteOrder).toHaveBeenCalledTimes(0);
      instance.handleConfirmDeleting();
      expect(propsWithOrders.deleteOrder).toHaveBeenCalledTimes(1);
      expect(propsWithOrders.deleteOrder).toHaveBeenCalledWith(orderId, propsWithOrders.token);
     
      instance.handleCancelDeleting();
      expect(instance.state.orderToDelete).toBe(null);
    });
  });
});