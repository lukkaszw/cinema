import {
  login,
  logout,
} from './authRedux';

import {
  LOGIN,
  LOGOUT,
} from './authRedux';

describe('Auth reducer action creators', () => {
  it('creates proper action name when it is started to login', () => {
    const mockedToken = 'sometoken';
    const expectedAction = {
      payload: mockedToken,
      type: LOGIN,
    };
    expect(login(mockedToken)).toEqual(expectedAction);
  });

  it('creates proper action name when it is going to logout', () => {
    const expectedAction = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
  });
});