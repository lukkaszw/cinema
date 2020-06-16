import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API from './api';
import actions from '../actions/actions';
import orderActions from '../../ordersRedux/actions/actions';

const initialState =   {
  data: [],
  loading: {
    isActive: false,
    isError: false,
  },
};

const mockedToken = 'somevalidtoken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialState,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data })
const mockError = error => ({ status: 500, response: error })


describe('User Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates proper actions with proper data when fetching is succeded', () => {
    const mockedOrders = [
      'order1',
      'order2',
    ];
    const response = {
      name: 'Someusername',
      surname: 'Sumeusersurname',
      phone: '666 666 666',
      email: 'email@wp.pl',
      orders: mockedOrders,
    };

    const expecdedData = {...response};
    delete expecdedData.orders;

    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: actions.START_FETCHING },
      { type: actions.SET_FETCH_DATA, payload: expecdedData },
      { type: orderActions.SET_USER_ORDERS, payload: mockedOrders },
    ];
 
    return store.dispatch(API.fetchData(mockedToken))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('creates only error when token is not provided', () => {
    const store = makeMockStore();

    const expected = [{
      type: actions.SET_FETCH_ERROR,
    }];

    store.dispatch(API.fetchData());
    expect(store.getActions()).toEqual(expected);
  });

  it('creates proper actions when fetching is error', () => {
    const response = { error: 'test '};
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(response));
    });

    const expected = [
      { type: actions.START_FETCHING },
      { type: actions.SET_FETCH_ERROR },
    ];

    return store.dispatch(API.fetchData(mockedToken))
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});