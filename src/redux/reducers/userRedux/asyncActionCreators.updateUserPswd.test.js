import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  updateUserPswd
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

const mockedSuccessMsg = 'Password was updated!';
const mockedToken = 'sometoken';
const mockedData = {
  oldPassword: 'someoldPswd',
  password: 'newpassword',
  confirmPassword: 'newpassword',
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
const mockError = error => ({ status: 500, response: error })


describe('User Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates proper actions when updating user password was successfull', () => {
    const response = {
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
    ];
 
    return store.dispatch(updateUserPswd(mockedToken, mockedData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('creates proper actions when updating user password was ended with error', () => {
    const expectedMessage = 'Error. Make sure you provide correct data and try again!';

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

    return store.dispatch(updateUserPswd(mockedToken, mockedData))
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});