import ordersReducer from './ordersRedux';
import {
  SET_USER_ORDERS,
  DELETE_USER_ORDER,
} from './ordersRedux';
import { mockedUserOrders } from './mockedData';

const mockedStatePart = {
  userOrders: [],
  orderToEdit: {},
  loading: {
    isActive: false,
    isError: false,
  },
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
    expect(ordersReducer(mockedStatePart, { payload: mockedUserOrders ,type: SET_USER_ORDERS })).not.toBe(mockedStatePart);
    //check if reducer returns proper stae
    expect(ordersReducer(mockedStatePart, { payload: mockedUserOrders ,type: SET_USER_ORDERS })).toEqual({
      ...mockedStatePart,
      userOrders: mockedUserOrders,
    });
  });

  it('returns proper state after deleting user order', () => {
    const mockedStateWithOrders = {
      ...mockedStatePart,
      userOrders: [{ _id: '1' }, { _id: '2'}],
    };

    const orderToDel = '1';
    const expectedOrders = [{ _id: '2'}];

    //check if reducer is clean function
    expect(ordersReducer(mockedStateWithOrders, { payload: orderToDel ,type: DELETE_USER_ORDER })).not.toBe(mockedStateWithOrders);
    //check if reducer returns proper stae
    expect(ordersReducer(mockedStateWithOrders, { payload: orderToDel ,type: DELETE_USER_ORDER })).toEqual({
      ...mockedStateWithOrders,
      userOrders: expectedOrders,
    });
  });
});

