import {
  setUserOrders,
  deleteUserOrder,
} from './ordersRedux';
import {
  SET_USER_ORDERS,
  DELETE_USER_ORDER,
} from './ordersRedux';
import { mockedUserOrders } from './mockedData';

describe('Orders reducer - action creators', () => {
  it('creates proper action when setting user orders', () => {
    const expectedAction = {
      payload: mockedUserOrders,
      type: SET_USER_ORDERS,
    };

    expect(setUserOrders(mockedUserOrders)).toEqual(expectedAction);
  });

  it('creates proper action when deleting an order', () => {
    const mockedId = '1';
    const expectedAction = {
      payload: mockedId,
      type: DELETE_USER_ORDER,
    };

    expect(deleteUserOrder(mockedId)).toEqual(expectedAction);
  });
});