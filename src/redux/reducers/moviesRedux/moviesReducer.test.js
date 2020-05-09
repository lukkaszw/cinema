import moviesReducer from './moviesRedux';
import { 
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_ALL_FILTER,
  SET_CURRENT_FILTER,
} from './moviesRedux';

const mockedStatePart = {
  data: [],
  filters: {
    all: 'all',
    current: 'all',
  },
  loading: {
    isActive: false,
    isError: false,
  },
};

const mockedData = [
  {
    id: '1',
    title: 'Title test 1',
    duration: 120,
    categories: ['Action', 'Drama'],
    image: '/images/carts/image-test.jpg',
  },
  {
    id: '2',
    title: 'Title test 2',
    duration: 116,
    categories: ['Adventure'],
    image: '/images/carts/image-test2.jpg',
  },
]

describe('Movies Reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(moviesReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state if app is starting fetching data', () => {
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: START_FETCHING })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviesReducer(mockedStatePart, { type: START_FETCHING })).toEqual({
      data: [],
      filters: {
        all: 'all',
        current: 'all',
      },
      loading: {
        isActive: true,
        isError: false,
      }
    });
  });

  it('returns proper state if error is occured', () => {
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviesReducer(mockedStatePart, { type: SET_ERROR })).toEqual({
      data: [],
      filters: {
        all: 'all',
        current: 'all',
      },
      loading: {
        isActive: false,
        isError: true,
      },
    })
  });

  it('returns proper data in state when fetching data succeded', () => {
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_DATA, payload: mockedData })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviesReducer(mockedStatePart, { type: SET_DATA, payload: mockedData })).toEqual({
      data: mockedData,
      filters: {
        all: 'all',
        current: 'all',
      },
      loading: {
        isActive: false,
        isError: false,
      }
    })
  });

  it('returns proper data in state when user set all movies filter', () => {
    const expectedPayload = '3d';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_ALL_FILTER, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: SET_ALL_FILTER, payload: expectedPayload })).toEqual({
      data: [],
      loading: {
        isActive: false,
        isError: false,
      },
      filters: {
        all: expectedPayload,
        current: 'all',
      },
    });
  });

  it('returns proper data in state when user set current movies filter', () => {
    const expectedPayload = '2d';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_CURRENT_FILTER, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: SET_CURRENT_FILTER, payload: expectedPayload })).toEqual({
      data: [],
      loading: {
        isActive: false,
        isError: false,
      },
      filters: {
        all: 'all',
        current: expectedPayload,
      },
    });
  });
});

