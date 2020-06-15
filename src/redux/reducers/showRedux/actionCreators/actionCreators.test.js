import actionCreators from './actionCreators';
import actions from '../actions/actions';

import { mockedData } from '../testUtils/mockedData';

describe('Show reducer action creators', () => {
  it('returns proper action when starting to fetch data', () => {
    const expectedActions = {
      type: actions.START_FETCHING_DATA,
    };

    expect(actionCreators.startFetching()).toEqual(expectedActions);
  });

  it('returns proper action when setting data', () => {

    const expectedActions = {
      type: actions.SET_DATA,
      payload: mockedData,
    }

    expect(actionCreators.setData(mockedData)).toEqual(expectedActions);
  });

  it('returns proper action when setting error', () => {
    const expectedActions = {
      type: actions.SET_ERROR,
    };

    expect(actionCreators.setError()).toEqual(expectedActions);
  });
});