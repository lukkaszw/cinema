import {
  startFetching,
  setError,
  updateSeats,
} from './seatsRedux';

import {
  START_FETCHING_SEATS,
  SET_ERROR,
  SET_DATA,
} from './seatsRedux';

import { mockedSeats } from './mockedData';

describe('Seats reducer action creators', () => {
  it('returns proper action when starting to fetch data', () => {
    const expectedActions = {
      type: START_FETCHING_SEATS,
    };

    expect(startFetching()).toEqual(expectedActions);
  });

  it('returns proper action when setting data', () => {

    const expectedActions = {
      type: SET_DATA,
      payload: mockedSeats,
    }

    expect(updateSeats(mockedSeats)).toEqual(expectedActions);
  });

  it('returns proper action when setting error', () => {
    const expectedActions = {
      type: SET_ERROR,
    };

    expect(setError()).toEqual(expectedActions);
  });
});

