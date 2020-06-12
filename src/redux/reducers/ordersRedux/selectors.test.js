import {
  getUserOrders,
} from './ordersRedux';
import { mockedUserOrders } from './mockedData';

const mockedState = {
  orders: {
    orderToEdit: {},
    loading: {
      isActive: false,
      isError: false,
    },
    userOrders: mockedUserOrders,
  }
}

describe('Orders reducer - selectors', () => {
  describe('getUserOrders selector', () => {
    it('returns proper user orders', () => {
      expect(getUserOrders(mockedState)).toEqual(mockedUserOrders);
    });
  });
});