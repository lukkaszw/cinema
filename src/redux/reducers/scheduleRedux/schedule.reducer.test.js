import scheduleReducer from './schedule.reducer';
import actions from './actions/actions';

const mockedStatePart = {
  data: [],
  loading: {
    isActive: false,
    isError: false,
  },
  filters: {
    page: 1,
    searchText: '',
  }
};

const mockedData = [
  {
    id: '1',
  },
  {
    id: '2',
  },
];

describe('Movies Reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(scheduleReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(scheduleReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(scheduleReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(scheduleReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(scheduleReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(scheduleReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state if app is starting fetching data', () => {
    //check if reducer is clean function
    expect(scheduleReducer(mockedStatePart, { type: actions.START_FETCHING })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(scheduleReducer(mockedStatePart, { type: actions.START_FETCHING })).toEqual({
      data: [],
      loading: {
        isActive: true,
        isError: false,
      },
      filters: {
        page: 1,
        searchText: '',
      }
    });
  });

  it('returns proper state if error is occured', () => {
    //check if reducer is clean function
    expect(scheduleReducer(mockedStatePart, { type: actions.SET_FETCH_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(scheduleReducer(mockedStatePart, { type: actions.SET_FETCH_ERROR })).toEqual({
      data: [],
      loading: {
        isActive: false,
        isError: true,
      },
      filters: {
        page: 1,
        searchText: '',
      }
    })
  });

  it('returns proper data in state when fetching data succeded', () => {
    //check if reducer is clean function
    expect(scheduleReducer(mockedStatePart, { type: actions.SET_FETCH_DATA, payload: mockedData })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(scheduleReducer(mockedStatePart, { type: actions.SET_FETCH_DATA, payload: mockedData })).toEqual({
      data: mockedData,
      loading: {
        isActive: false,
        isError: false,
      },
      filters: {
        page: 1,
        searchText: '',
      }
    })
  });

  it('updates page properly', () => {
    //check if reducer is clean function
    expect(scheduleReducer(mockedStatePart, { type: actions.SET_PAGE, payload: 2 })).not.toBe(mockedStatePart);
     //check if reducer returns proper state
    expect(scheduleReducer(mockedStatePart, { type: actions.SET_PAGE, payload: 2 })).toEqual({
      data: [],
      loading: {
        isActive: false,
        isError: false,
      },
      filters: {
        page: 2,
        searchText: '',
      }
    })
  });

  it('updates searchText properly', () => {
    //check if reducer is clean function
    expect(scheduleReducer(mockedStatePart, { type: actions.CHANGE_SEARCH_TEXT, payload: 'test text' })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(scheduleReducer(mockedStatePart, { type: actions.CHANGE_SEARCH_TEXT, payload: 'test text' })).toEqual({
      data: [],
      loading: {
        isActive: false,
        isError: false,
      },
      filters: {
        page: 1,
        searchText: 'test text',
      }
    })
  });
});

