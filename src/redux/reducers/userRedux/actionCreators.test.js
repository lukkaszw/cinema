import {
  startFetching,
  setData,
  setError,
} from './userRedux';

import {
  START_FETCHING,
  SET_DATA,
  SET_ERROR,
} from './userRedux';

describe('User reducer - action creators', () => {
  it('creates proper action when starting fetching data', () => {
    const expectedAction = {
      type: START_FETCHING,
    };

    expect(startFetching()).toEqual(expectedAction);
  });

  it('creates proper action when fetching data was succeded', () => {
    const payloadData = {
      name: 'Somename',
      surname: 'Sumsurname',
      phone: '666 666 666',
      email: 'email@wp.pl',
    };

    const expectedAction = {
      type: SET_DATA, payload: payloadData,
    };

    expect(setData(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when fetching data was ended with error', () => {
    const expectedAction = {
      type: SET_ERROR,
    };

    expect(setError()).toEqual(expectedAction);
  });
});