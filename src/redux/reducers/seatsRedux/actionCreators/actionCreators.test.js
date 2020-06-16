import actionCreators from './actionCreators';
import actions from '../actions/actions';

import { mockedSeats } from '../testUtils/mockedData';

describe('Seats reducer action creators', () => {
  it('returns proper action when starting to fetch data', () => {
    const expectedActions = {
      type: actions.START_FETCHING,
    };

    expect(actionCreators.startFetching()).toEqual(expectedActions);
  });

  it('returns proper action when setting data', () => {

    const expectedActions = {
      type: actions.SET_FETCH_DATA,
      payload: mockedSeats,
    }

    expect(actionCreators.setFetchData(mockedSeats)).toEqual(expectedActions);
  });

  it('returns proper action when setting error', () => {
    const expectedActions = {
      type: actions.SET_FETCH_ERROR,
    };

    expect(actionCreators.setFetchError()).toEqual(expectedActions);
  });
});

