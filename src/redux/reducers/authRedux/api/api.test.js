import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import formActions from '../../formsRedux/actions/actions';
import userActions from '../../userRedux/actions/actions';
import actions from '../actions/actions';
import API from './api';


const mockedCredentialsForLogin = {
  login: 'Some name',
  password: 'some password',
};

const mockedCredentialsForRegister = {
  ...mockedCredentialsForLogin,
  confirmPassword: 'some password',
}

const mockedDestinations = {
  login: 'login',
  register: 'register',
}

const mockedToken = 'somedummytoken';

const initialState = {
  auth: {
    token: null,
  },
  formsState: {
    sending: {
      isActive: false,
      isError: false,
      isSuccess: false,
    },
    message: '',
  }
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = initialState) => { 
  return mockStore({
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data });
const mockUserError = data => ({ status: 200, response: data });
const mockeServerError = error => ({ status: 500, error });

describe('Auth reducer async actions', () => {

  describe('sendCredentials', () => {
    beforeEach(() => {
      localStorage.clear();
      moxios.install();
    });
    afterEach(() => moxios.uninstall());

    it('creates proper actions with proper payload when login was succeded and it returns token, set local storage "tkn" item', () => {

      const response = {
        token: mockedToken,
        message: 'Auth success!',
      }
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING, payload: mockedDestinations.login },
        { type: actions.LOGIN, payload: response.token },
      ];

       //check localStoreage before login - tkn should not exist
       expect(localStorage.getItem('tkn')).toBe(null);
   
      return store.dispatch(API.sendCredentials(mockedCredentialsForLogin, mockedDestinations.login))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          //check localStoreage after logn - tkn should exist
          expect(localStorage.getItem('tkn')).toBe(mockedToken);
        });
    });
  
    it('creates proper actions with proper payload when register was succeded but it does not returns token, only message, and it does not set localStorage tkn item', () => {
  
      const response = {
        message: 'Register success!',
      }
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });
  
      const expected = [
        { type: formActions.START_SENDING, payload: mockedDestinations.register },
        { type: formActions.SET_SEND_SUCCESS, payload: response.message },
      ];

      return store.dispatch(API.sendCredentials(mockedCredentialsForRegister, mockedDestinations.register))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          //check localStoreage after registration - tkn should not exist
          expect(localStorage.getItem('tkn')).toBe(null);
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
        { type: formActions.START_SENDING, payload: mockedDestinations.login },
        { type: formActions.SET_SEND_ERROR, payload: response.message },
      ];
   
      return store.dispatch(API.sendCredentials(mockedCredentialsForLogin, mockedDestinations.login))
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
        { type: formActions.START_SENDING, payload: mockedDestinations.register },
        { type: formActions.SET_SEND_ERROR, payload: 'Internal server error. Try again later.' },
      ];
   
      return store.dispatch(API.sendCredentials(mockedCredentialsForRegister, mockedDestinations.register))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });
  
  describe('logoutUser', () => {

    beforeEach(() => {
      localStorage.setItem('tkn', mockedToken);
      moxios.install()
    });
    afterEach(() => {
      moxios.uninstall();
      localStorage.clear();
    });

    it('creates proper logout action on reducer without matter if logout process is succeded on server and it removes "tkn" item from localStorage', () => {

      
      
      const response = {};
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expected = [
        { type: actions.LOGOUT },
        { type: userActions.SET_FETCH_DATA, payload: {}}
      ];

      //check localStoreage before logout - should exist
      expect(localStorage.getItem('tkn')).toBe(mockedToken);
   
      return store.dispatch(API.logoutUser(mockedToken)).then(() => {
          //check if logout action is created
          expect(store.getActions()).toEqual(expected);
          //check localStorage after logout - should not exist
          expect(localStorage.getItem('tkn')).toBe(null);
        });
    });

    it('creates proper logout action on reducer without matter if logout process is not succeded on server', () => {
      
      const response = {};
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockeServerError(response));
      });

      const expected = [
        { type: actions.LOGOUT },
        { type: userActions.SET_FETCH_DATA, payload: {}}
      ];

      //check localStoreage before logout - should exist
      expect(localStorage.getItem('tkn')).toBe(mockedToken);
   
      return store.dispatch(API.logoutUser(mockedToken)).then(() => {
          //check if logout action is created
          expect(store.getActions()).toEqual(expected);
          //check localStorage after logout - should not exist
          expect(localStorage.getItem('tkn')).toBe(null);
        });
    });
  });
})