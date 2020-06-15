import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API from './api';
import actions from '../actions/actions';
import { mockedData } from '../testUtils/mockedData';

const initialState =   {
  data: {},
  seats: {
    userSeats: [],
    allSeats: [],
  },
  loadingData: {
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


describe('Show Reducer async actions', () => {
  describe('fetchShowData', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates proper actions with proper data when fetching is succeded', () => {
      const response = mockedData;
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = [
        { type: actions.START_FETCHING_DATA },
        { type: actions.SET_DATA, payload: response },
      ];

      return store.dispatch(API.fetchShowData())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('create proper actions when fetching is error', () => {
      const response = { error: 'test '};
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(response));
      });
  
      const expected = [
        { type: actions.START_FETCHING_DATA },
        { type: actions.SET_ERROR },
      ];
  
      return store.dispatch(API.fetchShowData())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });
  });
});