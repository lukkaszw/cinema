import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  updateUserData
} from './userRedux';
import {
  SET_DATA,
} from './userRedux';

import {
  START_SENDING,
  SET_SUCCESS,
  SET_ERROR,
} from '../formsRedux/formsRedux';

const initialState =   {
  data: {},
  loading: {
    isActive: false,
    isError: false,
  },
};

const mockedToken = 'sometoken';
const mockedData = {
  email: 'lucas@wp.pl',
  news: [],
};
const mockedSuccessMsg = 'Data updated!';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialState,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 500, response: error })


describe('User Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates proper actions when updating user data was successfull', () => {
    const response = {
      userData: mockedData,
      message: mockedSuccessMsg,
    };
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: START_SENDING },
      { type: SET_SUCCESS, payload: mockedSuccessMsg },
      { type: SET_DATA, payload: mockedData },
    ];
 
    return store.dispatch(updateUserData(mockedToken, mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('creates proper actions when updating user data was ended with error', () => {
    const expectedMessage = 'Error. Try again later!';

    const response = {};
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(response));
    });

    const expected = [
      { type: START_SENDING },
      { type: SET_ERROR, payload: expectedMessage },
    ];

    return store.dispatch(updateUserData(mockedToken, mockedData))
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});