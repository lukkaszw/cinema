import moviePageReducer from './moviePage.reducer';
import actions from './actions/actions';

const mockedStatePart =   {
  data: {},
  loading: {
    isActive: false,
    isError: false,
  },
};

const mockedData = {
  title: 'test title',
};

describe('MoviePage Reducer', () => {
  it('returns same state if action type is other than defined actions', () => {
    expect(moviePageReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(moviePageReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(moviePageReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(moviePageReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(moviePageReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(moviePageReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state if app is starting fetching data', () => {
    //check if reducer is clean function
    expect(moviePageReducer(mockedStatePart, { type: actions.START_LOADING })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviePageReducer(mockedStatePart, { type: actions.START_LOADING })).toEqual({
      data: {},
      loading: {
        isActive: true,
        isError: false,
      }
    });
  });

  it('returns proper state if error is occured', () => {
    //check if reducer is clean function
    expect(moviePageReducer(mockedStatePart, { type: actions.SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviePageReducer(mockedStatePart, { type: actions.SET_ERROR })).toEqual({
      data: {},
      loading: {
        isActive: false,
        isError: true,
      },
    })
  });

  it('returns proper data in state when fetching data succeded', () => {
    //check if reducer is clean function
    expect(moviePageReducer(mockedStatePart, { type: actions.SET_DATA, payload: mockedData })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviePageReducer(mockedStatePart, { type: actions.SET_DATA, payload: mockedData })).toEqual({
      data: mockedData,
      loading: {
        isActive: false,
        isError: false,
      }
    })
  });

});