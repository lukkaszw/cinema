import seatsReducer from './seatsRedux';
import {
  START_FETCHING_SEATS,
  SET_ERROR,
  SET_DATA,
} from './seatsRedux';
import { mockedSeats } from './mockedData';

const mockedStatePart = {
  data: [],
  loading: {
    isActive: false,
    isError: false,
  },
}

describe('Seats reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(seatsReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(seatsReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(seatsReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(seatsReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(seatsReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(seatsReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state when app is fetching', () => {
    //check if reducer is clean function
    expect(seatsReducer(mockedStatePart, { type: START_FETCHING_SEATS })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(seatsReducer(mockedStatePart, { type: START_FETCHING_SEATS })).toEqual({
      ...mockedStatePart,
      loading: {
        isActive: true,
        isError: false,
      },
    });
  });

  it('returns proper state when setting error', () => {
    //check if reducer is clean function
    expect(seatsReducer(mockedStatePart, { type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(seatsReducer(mockedStatePart, { type: SET_ERROR })).toEqual({
      ...mockedStatePart,
      loading: {
        isActive: false,
        isError: true,
      },
    });
  });

  it('returns proper state when setting data', () => {
    //check if reducer is clean function
    expect(seatsReducer(mockedStatePart, { type: SET_DATA, payload: mockedSeats })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(seatsReducer(mockedStatePart, { type: SET_DATA, payload: mockedSeats })).toEqual({
      data: mockedSeats,
      loading: {
        isActive: false,
        isError: false,
      },
    });
  });
});