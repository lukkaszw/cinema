import {
  startFetching,
  setData,
  setError,
} from './moviePageRedux';

import {
  START_LOADING,
  SET_DATA,
  SET_ERROR,
} from './moviePageRedux';

describe('MoviePage reducer actions', () => {
  it('starts loading action when data is starting to fetch', () => {
    const expectedAction = {
      type: START_LOADING,
    };
    expect(startFetching()).toEqual(expectedAction);
  });

  it('starts setting data action with proper data when fetching was succeded', () => {
    const expectedData = {
      test: 'test data',
    };
    const expectedAction = {
      type: SET_DATA,
      payload: expectedData,
    };

    expect(setData(expectedData)).toEqual(expectedAction);
  });

  it('starts setting error action when fetching data was ended with error', () => {
    const expectedAction = {
      type: SET_ERROR,
    };

    expect(setError()).toEqual(expectedAction);
  });
});