import authReducer from './auth.reducer';
import actions from './actions/actions';

const mockedStatePart = {
  token: null,
};

describe('Auth reducer', () => {
  it('returns same state if action type is other than defined actions', () => {
    expect(authReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(authReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(authReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(authReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(authReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(authReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state when it uses LOGIN action', () => {
    const mockedToken = 'sometoken';
     //check if reducer is clean function
     expect(authReducer(mockedStatePart, { type: actions.LOGIN, payload: mockedToken })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(authReducer(mockedStatePart, { type: actions.LOGIN, payload: mockedToken })).toEqual({
      token: mockedToken,
    });
  });

  it('returns proper state when it uses LOGOUT action', () => {
    const mockedToken = 'sometoken';
    const statePartWithToken = {
      token: mockedToken,
    };
     //check if reducer is clean function
     expect(authReducer(statePartWithToken, { type: actions.LOGOUT })).not.toBe(statePartWithToken);
    //check if reducer returns proper state
    expect(authReducer(statePartWithToken, { type: actions.LOGOUT })).toEqual({
      token: null,
    });
  });
});