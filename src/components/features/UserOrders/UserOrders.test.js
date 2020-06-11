import React from 'react';
import { shallow } from 'enzyme';
import UserOrders from './UserOrders';

const mockedProps = {
  orders: [],
};

const propsWithOrders = {
  orders: [
    {
      _id: '1',
      seats: ['2A', '3B'],
      name: 'Name1',
      surname: 'Surname1',
      email: 'email1@wp.pl',
      phone: '555 555 555',
      showId: {},
    },
    {
      _id: '2',
      seats: ['3D', '7C'],
      name: 'Name2',
      surname: 'Surname2',
      email: 'email2@wp.pl',
      phone: '666 666 666',
      showId: {},
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
  });

  describe('functionality', () => {
    let component;

    beforeEach(() => {
      component = shallow(<UserOrders {...propsWithOrders} />);
    });

    it('starts with no active order', () => {
      expect(component.state('activeOrder')).toEqual(null);
    });

    it('fires handleToggleOrder method when using onToggleActive OrderItem prop', () => {
      class MockUserOrders extends UserOrders {
        handleToggleOrder = jest.fn();
      }

      const mockComponent = shallow(<MockUserOrders {...propsWithOrders}/>);
      const instance = mockComponent.instance();

      let expectedCallTimes = 0;
      //check at start
      expect(instance.handleToggleOrder).toHaveBeenCalledTimes(expectedCallTimes);
      //check after using onToggleActive
      const orderEls = mockComponent.find('OrderItem');
      orderEls.forEach((orderEl, i) => {
        orderEl.prop('onToggleActive')();
        expectedCallTimes++;
        const expectedValue = propsWithOrders.orders[i]._id;
        expect(instance.handleToggleOrder).toHaveBeenCalledTimes(expectedCallTimes);
        expect(instance.handleToggleOrder).toHaveBeenCalledWith(expectedValue);
      })

    })

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
  });
});