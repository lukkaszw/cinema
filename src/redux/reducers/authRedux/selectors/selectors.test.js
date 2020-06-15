import selectors from './selectors';

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
      expect(selectors.getIsAuthenticated(mockedInitialState)).toBe(false);
      expect(selectors.getIsAuthenticated(mockedStateWhithToken)).toBe(true);
    });
  });

  describe('getToken', () => {
    it('returns proper token', () => {
      expect(selectors.getToken(mockedInitialState)).toBe(null);
      expect(selectors.getToken(mockedStateWhithToken)).toBe(mockedToken);
    });
  });
});