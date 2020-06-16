import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API from './api';
import actions from '../actions/actions';
import formActions from '../../formsRedux/actions/actions';

import { mockedData } from '../testUtils/mockedData';

const mockedOrderId = '1';
const mockedToken = 'someToken';

const initialState =   {
  userOrders: [],
  orderToEdit: null,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialState,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 500, response: error });

describe('Order Reducer async actions', () => {

  describe('orderTickets', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates proper actions when ordering was succeded', () => {
      const response = {}
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING },
        { type: formActions.SET_SEND_SUCCESS },
      ];
   
      return store.dispatch(API.orderTickets(mockedData))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  
    it('creates proper actions when ordering tickets ended with error', () => {
  
      const response = {};
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING },
        { type: formActions.SET_SEND_ERROR },
      ];
  
      return store.dispatch(API.orderTickets(mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });
  });

  describe('deleteOrder', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates proper actions when deleting was succeded', () => {
      const response = 'orderID'
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING },
        { type: formActions.SET_SEND_SUCCESS },
        { payload: response, type: actions.DELETE_USER_ORDER }
      ];
   
      return store.dispatch(API.deleteOrder(mockedOrderId, mockedToken))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('creates proper actions when deleting an order ended with error', () => {
  
      const response = {};
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING },
        { type: formActions.SET_SEND_ERROR },
      ];
  
      return store.dispatch(API.deleteOrder(mockedOrderId, mockedToken))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });
  });

  describe('editOrder', () => {
    const orderId = '1';
    const orderData = {...mockedData};
    delete orderData.showId;

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates proper actions when deleting was succeded', () => {
  
      const response = {
        ...orderData,
        _id: orderId,
      }

      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING },
        { type: formActions.SET_SEND_SUCCESS },
        { payload: response, type: actions.UPDATE_USER_ORDER },
      ];
   
      return store.dispatch(API.editOrder(orderData, mockedToken, orderId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('creates proper actions when deleting an order ended with error', () => {
      const response = {};
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING },
        { type: formActions.SET_SEND_ERROR },
      ];
  
      return store.dispatch(API.editOrder(orderData, mockedToken, orderId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });
  });
});