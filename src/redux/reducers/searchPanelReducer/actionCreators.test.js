/* action creators */
// export const startSearching = () => ({ type: START_SEARCHING });
// export const setFoundData = (data) => ({ payload: data, type: SET_FOUND_DATA });
// export const setError = () => ({ type: SET_ERROR });

import {
  startSearching,
  setFoundData,
  setError,
} from './searchPanelReducer';

import {
  START_SEARCHING,
  SET_FOUND_DATA,
  SET_ERROR,
} from './searchPanelReducer';

describe('Search panel reducers action creators', () => {
  it('creates proper action when user is starting to search', () => {
    const mockedSearchText = 'search text';

    const expectedAction = {
      payload: mockedSearchText,
      type: START_SEARCHING,
    };
    expect(startSearching(mockedSearchText)).toEqual(expectedAction);
  });

  it('creates proper action when user found some data', () => {
    const mockedData = ['data 1', 'data 2'];
    const expectedAction = {
      payload: mockedData,
      type: SET_FOUND_DATA, 
    };
    expect(setFoundData(mockedData)).toEqual(expectedAction);
  });

  it('creates proper action when searching data was completed with error', () => {
    const expectedAction = {
      type: SET_ERROR, 
    };
    expect(setError()).toEqual(expectedAction);
  });
});