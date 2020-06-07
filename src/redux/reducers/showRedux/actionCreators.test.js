import {
  startFetching,
  setData,
  setError,
} from './showRedux';

import {
  START_FETCHING_DATA,
  SET_DATA,
  SET_ERROR,
} from './showRedux';

import { mockedData } from './showRedux';

describe('Show reducer action creators', () => {
  it('returns proper action when starting to fetch data', () => {
    const expectedActions = {
      type: START_FETCHING_DATA,
    };

    expect(startFetching()).toEqual(expectedActions);
  });

  it('returns proper action when setting data', () => {

    const expectedActions = {
      type: SET_DATA,
      payload: mockedData,
    }

    expect(setData(mockedData)).toEqual(expectedActions);
  });

  it('returns proper action when setting error', () => {
    const expectedActions = {
      type: SET_ERROR,
    };

    expect(setError()).toEqual(expectedActions);
  });
});