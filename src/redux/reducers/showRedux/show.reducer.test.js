import showReducer from './show.reducer';
import actions from './actions/actions';
import { mockedData } from './testUtils/mockedData';

const mockedStatePart = {
  data: {},
  loadingData: {
    isActive: false,
    isError: false,
  },
}


describe('Show reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(showReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(showReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(showReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(showReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(showReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(showReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state when app is fetching', () => {
    //check if reducer is clean function
    expect(showReducer(mockedStatePart, { type: actions.START_FETCHING_DATA })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(showReducer(mockedStatePart, { type: actions.START_FETCHING_DATA })).toEqual({
      ...mockedStatePart,
      loadingData: {
        isActive: true,
        isError: false,
      },
    });
  });

  it('returns proper state when setting error', () => {
    //check if reducer is clean function
    expect(showReducer(mockedStatePart, { type: actions.SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(showReducer(mockedStatePart, { type: actions.SET_ERROR })).toEqual({
      ...mockedStatePart,
      loadingData: {
        isActive: false,
        isError: true,
      },
    });
  });

  it('returns proper state when setting data', () => {
    //check if reducer is clean function
    expect(showReducer(mockedStatePart, { type: actions.SET_DATA, payload: mockedData })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(showReducer(mockedStatePart, { type: actions.SET_DATA, payload: mockedData })).toEqual({
      ...mockedStatePart,
      data: mockedData,
    });
  });
});

