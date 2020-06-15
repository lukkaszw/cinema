import actionCreators from '../actionCreators/actionCreators';
import actions from '../actions/actions';

describe('Auth reducer action creators', () => {
  it('creates proper action name when it is started to login', () => {
    const mockedToken = 'sometoken';
    const expectedAction = {
      payload: mockedToken,
      type: actions.LOGIN,
    };
    expect(actionCreators.login(mockedToken)).toEqual(expectedAction);
  });

  it('creates proper action name when it is going to logout', () => {
    const expectedAction = {
      type: actions.LOGOUT,
    };
    expect(actionCreators.logout()).toEqual(expectedAction);
  });
});