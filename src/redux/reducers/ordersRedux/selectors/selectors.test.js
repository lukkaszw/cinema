import selectors from './selectors';
import { mockedUserOrders, mockedUserData} from '../testUtils/mockedData';

const mockedState = {
  orders: {
    orderToEdit: mockedUserOrders[0]._id,
    userOrders: mockedUserOrders,
  }
}

describe('Orders reducer - selectors', () => {
  describe('getUserOrders selector', () => {
    it('returns proper user orders', () => {
      expect(selectors.getUserOrders(mockedState)).toEqual(mockedUserOrders);
    });
  });

  describe('getEditingOrder', () => {
    const expected = mockedUserOrders[0];
    expect(selectors.getEditingOrder(mockedState)).toEqual(expected);
  });

  describe('getEditingOrderUser', () => {
    const expected = mockedUserData[0];
    expect(selectors.getEditingOrderUser(mockedState)).toEqual(expected);
  });
});