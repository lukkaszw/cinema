import actionCreators from './actionCreators';
import actions from '../actions/actions';
import { mockedUserOrders } from '../testUtils/mockedData';

describe('Orders reducer - action creators', () => {
  it('creates proper action when setting user orders', () => {
    const expectedAction = {
      payload: mockedUserOrders,
      type: actions.SET_USER_ORDERS,
    };

    expect(actionCreators.setUserOrders(mockedUserOrders)).toEqual(expectedAction);
  });

  it('creates proper action when deleting an order', () => {
    const mockedId = '1';
    const expectedAction = {
      payload: mockedId,
      type: actions.DELETE_USER_ORDER,
    };

    expect(actionCreators.deleteUserOrder(mockedId)).toEqual(expectedAction);
  });

  it('creates proper action when setting order to edit', () => {
    const mockedId = '1';
    const expectedAction = {
      payload: mockedId,
      type: actions.SET_ORDER_TO_EDIT,
    };

    expect(actionCreators.setOrderToEdit(mockedId)).toEqual(expectedAction);
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
      type: actions.UPDATE_USER_ORDER,
    };

    expect(actionCreators.updateUserOrder(mockedData)).toEqual(expectedAction);
  });
});