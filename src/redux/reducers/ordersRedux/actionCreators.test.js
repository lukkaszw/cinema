import {
  setUserOrders,
  deleteUserOrder,
  setOrderToEdit,
  updateUserOrder,
} from './ordersRedux';
import {
  SET_USER_ORDERS,
  DELETE_USER_ORDER,
  SET_ORDER_TO_EDIT,
  UPDATE_USER_ORDER,
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

  it('creates proper action when setting order to edit', () => {
    const mockedId = '1';
    const expectedAction = {
      payload: mockedId,
      type: SET_ORDER_TO_EDIT,
    };

    expect(setOrderToEdit(mockedId)).toEqual(expectedAction);
  });

  it('creates proper action when editing order', () => {
    const mockedData = {
      _id: '1',
      seats: ['1A', '22G'],
      name: 'Name1',
      surname: 'Surname1',
      phone: '111 111 111',
      email: 'email@gmail.com',
    };

    const expectedAction = {
      payload: mockedData,
      type: UPDATE_USER_ORDER,
    };

    expect(updateUserOrder(mockedData)).toEqual(expectedAction);
  });
});