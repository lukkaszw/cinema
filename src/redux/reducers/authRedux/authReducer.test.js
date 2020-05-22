import authReducer from './authRedux';
import {
  LOGIN,
  LOGOUT,
} from './authRedux';

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
     expect(authReducer(mockedStatePart, { type: LOGIN, payload: mockedToken })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(authReducer(mockedStatePart, { type: LOGIN, payload: mockedToken })).toEqual({
      token: mockedToken,
    });
  });

  it('returns proper state when it uses LOGOUT action', () => {
    const mockedToken = 'sometoken';
    const statePartWithToken = {
      token: mockedToken,
    };
     //check if reducer is clean function
     expect(authReducer(statePartWithToken, { type: LOGOUT })).not.toBe(statePartWithToken);
    //check if reducer returns proper state
    expect(authReducer(statePartWithToken, { type: LOGOUT })).toEqual({
      token: null,
    });
  });
});