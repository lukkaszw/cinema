import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { orderTickets } from './orderRedux';
import {
  START_SENDING,
  SET_SUCCESS,
  SET_ERROR,
} from '../formsRedux/formsRedux';
import { mockedData } from './mockedData';

const initialState =   {
  data: {},
  loading: {
    isActive: false,
    isError: false,
  },
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
        { type: START_SENDING },
        { type: SET_SUCCESS },
      ];
   
      return store.dispatch(orderTickets(mockedData))
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
        { type: START_SENDING },
        { type: SET_ERROR },
      ];
  
      return store.dispatch(orderTickets(mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });
  });
});