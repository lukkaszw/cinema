import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import API from './api';
import actions from '../actions/actions';
import formActions from '../../formsRedux/actions/actions';

const mockedToken = 'sometoken';

const initialState = {};

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

  it('creates proper actions when deleting account was successful', () => {
    const mockedSuccessMsg = 'Account has been deleted!';

    const response = {
      message: mockedSuccessMsg
    };
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: formActions.START_SENDING },
      { type: formActions.SET_SEND_SUCCESS, payload: mockedSuccessMsg },
      { type: actions.SET_FETCH_DATA, payload: {}},
    ];
 
    return store.dispatch(API.deleteAccount(mockedToken))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('creates proper actions when deleting account was ended with error', () => {
    const expectedMessage = 'Error. Can not delete your account. Try again later.';

    const response = {};
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(response));
    });

    const expected = [
      { type: formActions.START_SENDING },
      { type: formActions.SET_SEND_ERROR, payload: expectedMessage },
    ];

    return store.dispatch(API.deleteAccount(mockedToken))
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});