import {
  getIsAuthenticated,
  getToken,
} from './authRedux';

const mockedInitialState = {
  auth: {
    token: null,
  }
};

const mockedToken = 'somemockedToken';


const mockedStateWhithToken = {
  auth: {
    token: mockedToken,
  }
};

describe('Auth reducer - selectors', () => {
  describe('getIsAuthenticated', () => {
    it('returns proper authentication state', () => {
      expect(getIsAuthenticated(mockedInitialState)).toBe(false);
      expect(getIsAuthenticated(mockedStateWhithToken)).toBe(true);
    });
  });

  describe('getToken', () => {
    it('returns proper token', () => {
      expect(getToken(mockedInitialState)).toBe(null);
      expect(getToken(mockedStateWhithToken)).toBe(mockedToken);
    });
  });
});