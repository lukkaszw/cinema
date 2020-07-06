import actionCreators from './actionCreators';
import actions from '../actions/actions';

import { mockedData } from '../testUtils/mockedData';

describe('Show reducer action creators', () => {
  it('returns proper action when starting to fetch data', () => {
    const expectedActions = {
      type: actions.START_FETCHING,
    };

    expect(actionCreators.startFetching()).toEqual(expectedActions);
  });

  it('returns proper action when setting data', () => {

    const expectedActions = {
      type: actions.SET_FETCH_DATA,
      payload: mockedData,
    }

    expect(actionCreators.setFetchData(mockedData)).toEqual(expectedActions);
  });

  it('returns proper action when setting error', () => {
    const expectedActions = {
      type: actions.SET_FETCH_ERROR,
    };

    expect(actionCreators.setFetchError()).toEqual(expectedActions);
  });

  it('returns proper action when resets the show data', () => {
    const expectedActions = {
      type: actions.RESET_DATA,
    };

    expect(actionCreators.resetData()).toEqual(expectedActions);
  });
});