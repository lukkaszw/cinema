import ordersReducer from './orders.reducer';
import actions from './actions/actions';
import { mockedUserOrders } from './testUtils/mockedData';

const mockedStatePart = {
  userOrders: [],
  orderToEdit: null,
};

const mockedStateWithOrders = {
  ...mockedStatePart,
  userOrders: [{ _id: '1' }, { _id: '2'}],
};

describe('Orders reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(ordersReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(ordersReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(ordersReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(ordersReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(ordersReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(ordersReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state after setting user orders', () => {
    //check if reducer is clean function
    expect(ordersReducer(mockedStatePart, { payload: mockedUserOrders ,type: actions.SET_USER_ORDERS })).not.toBe(mockedStatePart);
    //check if reducer returns proper stae
    expect(ordersReducer(mockedStatePart, { payload: mockedUserOrders ,type: actions.SET_USER_ORDERS })).toEqual({
      ...mockedStatePart,
      userOrders: mockedUserOrders,
    });
  });

  it('returns proper state after deleting user order', () => {
    const orderToDel = '1';
    const expectedOrders = [{ _id: '2'}];

    //check if reducer is clean function
    expect(ordersReducer(mockedStateWithOrders, { payload: orderToDel ,type: actions.DELETE_USER_ORDER })).not.toBe(mockedStateWithOrders);
    //check if reducer returns proper stae
    expect(ordersReducer(mockedStateWithOrders, { payload: orderToDel ,type: actions.DELETE_USER_ORDER })).toEqual({
      ...mockedStateWithOrders,
      userOrders: expectedOrders,
    });
  });

  it('returns proper state after setting an order to edit', () => {
    const orderIdToEdit = '1';
    //check if reducer is clean function
    expect(ordersReducer(mockedStateWithOrders, { payload: orderIdToEdit ,type: actions.SET_ORDER_TO_EDIT })).not.toBe(mockedStateWithOrders);
    //check if reducer returns proper stae
    expect(ordersReducer(mockedStateWithOrders, { payload: orderIdToEdit ,type: actions.SET_ORDER_TO_EDIT })).toEqual({
      ...mockedStateWithOrders,
      orderToEdit: orderIdToEdit,
    });
  });

  it('returns proper state after updating an order', () => {
    const orderToUpdate = {
      _id: '1',
      name: 'Name1'
      //...others
    };

    const expectedOrders = [orderToUpdate, {_id: '2'}];

    //check if reducer is clean function
    expect(ordersReducer(mockedStateWithOrders, { payload: orderToUpdate ,type: actions.UPDATE_USER_ORDER })).not.toBe(mockedStateWithOrders);
    //check if reducer returns proper stae
    expect(ordersReducer(mockedStateWithOrders, { payload: orderToUpdate ,type: actions.UPDATE_USER_ORDER })).toEqual({
      ...mockedStateWithOrders,
      userOrders: expectedOrders,
    });
  });
});

