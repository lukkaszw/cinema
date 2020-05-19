import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  START_SENDING,
  SET_ERROR,
  SET_SUCCESS,
} from './formsRedux';

import {
  sendData
} from './formsRedux';


const mockedUrl = '/api/messages';
const mockedData = {
  name: 'name',
  message: 'Message',
};


const initialStatePart = {
  sending: {
    isActive: false,
    isError: false,
    isSuccess: false,
  },
  message: '',
  validation: [],
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialStatePart,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data });
const mockUserError = data => ({ status: 200, response: data });
const mockeServerError = error => ({ status: 500, error });

describe('Forms Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates proper actions with proper payload when sending was succeded', () => {

    const response = {
      message: 'success!',
    }
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: START_SENDING },
      { type: SET_SUCCESS, payload: response.message },
    ];
 
    return store.dispatch(sendData(mockedUrl, mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  
  it('creates proper actions with proper payload when user request error occured', () => {

    const response = {
      isError: true,
      message: 'user error!',
    };

    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockUserError(response));
    });

    const expected = [
      { type: START_SENDING },
      { type: SET_ERROR, payload: response.message },
    ];
 
    return store.dispatch(sendData(mockedUrl, mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('creates proper actions with proper payload when server error occured', () => {

    const response = {
      message: 'server error!',
    };

    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockeServerError(response));
    });

    const expected = [
      { type: START_SENDING },
      { type: SET_ERROR, payload: 'Internal server error. Try again later.' },
    ];
 
    return store.dispatch(sendData(mockedUrl, mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

})