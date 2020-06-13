import {
  getUserOrders,
  getEditingOrder,
  getEditingOrderUser,
} from './ordersRedux';
import { mockedUserOrders, mockedUserData} from './mockedData';

const mockedState = {
  orders: {
    orderToEdit: mockedUserOrders[0]._id,
    userOrders: mockedUserOrders,
  }
}

describe('Orders reducer - selectors', () => {
  describe('getUserOrders selector', () => {
    it('returns proper user orders', () => {
      expect(getUserOrders(mockedState)).toEqual(mockedUserOrders);
    });
  });

  describe('getEditingOrder', () => {
    const expected = mockedUserOrders[0];
    expect(getEditingOrder(mockedState)).toEqual(expected);
  });

  describe('getEditingOrderUser', () => {
    const expected = mockedUserData[0];
    expect(getEditingOrderUser(mockedState)).toEqual(expected);
  });
});