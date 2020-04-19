import futureMoviesReducer from './futureMoviesRedux';
import {
  START_FETCHING,
  SET_DATA,
  SET_ERROR,
} from './futureMoviesRedux';

const mockedStatePart = {
  data: [],
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
];

describe('Future Movies Reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(futureMoviesReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(futureMoviesReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(futureMoviesReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(futureMoviesReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(futureMoviesReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(futureMoviesReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state if app is starting fetching data', () => {
      //check if reducer is clean function
      expect(futureMoviesReducer(mockedStatePart, { type: START_FETCHING })).not.toBe(mockedStatePart);
      //check if reducer returns proper state
      expect(futureMoviesReducer(mockedStatePart, { type: START_FETCHING })).toEqual({
        data: [],
        loading: {
          isActive: true,
          isError: false,
        }
      });
  });

  it('returns proper state if error is occured', () => {
    //check if reducer is clean function
    expect(futureMoviesReducer(mockedStatePart, { type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(futureMoviesReducer(mockedStatePart, { type: SET_ERROR })).toEqual({
      data: [],
      loading: {
        isActive: false,
        isError: true,
      },
    })
  });

  it('returns proper data in state when fetching data succeded', () => {
    //check if reducer is clean function
    expect(futureMoviesReducer(mockedStatePart, { type: SET_DATA, payload: mockedData })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(futureMoviesReducer(mockedStatePart, { type: SET_DATA, payload: mockedData })).toEqual({
      data: mockedData,
      loading: {
        isActive: false,
        isError: false,
      }
    })
  });

});