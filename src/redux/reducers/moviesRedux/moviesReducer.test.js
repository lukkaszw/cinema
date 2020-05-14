import moviesReducer, { TOGGLE_GENRE } from './moviesRedux';
import { 
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_ALL_FILTER,
  SET_CURRENT_FILTER,
  SET_SEARCH_TEXT,
  SET_PAGE,
  SET_PLAY_TIME,
  SET_SORT,
  RESET_FILTERS,
} from './moviesRedux';

const mockedStatePart = {
  data: [],
  filtersFor: {
    all: {
      filter: 'all',
      searchText: '',
      playTime: 'all',
      sort: 'asc',
      genres: [],
      page: 2,
    },
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
      ...mockedStatePart,
      loading: {
        ...mockedStatePart.loading,
        isActive: true,
      }
    });
  });

  it('returns proper state if error is occured', () => {
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviesReducer(mockedStatePart, { type: SET_ERROR })).toEqual({
      ...mockedStatePart,
      loading: {
        ...mockedStatePart.loading,
        isError: true,
      },
    })
  });

  it('returns proper data in state when fetching data succeded', () => {
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_DATA, payload: mockedData })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(moviesReducer(mockedStatePart, { type: SET_DATA, payload: mockedData })).toEqual({
      ...mockedStatePart,
      data: mockedData,
      loading: {
        isActive: false,
        isError: false,
      }
    })
  });

  it('returns proper data in state when user sets all movies filter', () => {
    const expectedPayload = '3d';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_ALL_FILTER, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: SET_ALL_FILTER, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          filter: expectedPayload,
          page: 1,
        },
      },
    });
  });

  it('returns proper data in state when user sets current movies filter', () => {
    const expectedPayload = '2d';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_CURRENT_FILTER, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: SET_CURRENT_FILTER, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        current: expectedPayload,
      },
    });
  });

  it('returns proper state when user updates search text', () => {
    const expectedPayload = 'test text';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart,  { type: SET_SEARCH_TEXT, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: SET_SEARCH_TEXT, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          searchText: expectedPayload,
          page: 1,
        },
      },
    });
  });

  it('returns proper state when user udates page', () => {
    const expectedPayload = 5;
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart,  { type: SET_PAGE, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart,  { type: SET_PAGE, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          page: expectedPayload,
        },
      },
    });
  });

  it('returns proper state when user udate play time filter', () => {
    const expectedPayload = 'soon';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart,  { type: SET_PLAY_TIME, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart,  { type: SET_PLAY_TIME, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          playTime: expectedPayload,
          page: 1,
        },
      },
    });
  });

  it('returns proper state when user set sort filter', () => {
    const expectedPayload = 'desc';
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: SET_SORT, payload: expectedPayload })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: SET_SORT, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          sort: expectedPayload,
        },
      },
    });
  });

  it('returns proper state when user set genre', () => {
    const expectedPayload = 'Comedy';
    //check if reducer is clean function
    const stateAfterReducer = moviesReducer(mockedStatePart, { type: TOGGLE_GENRE, payload: expectedPayload })
    expect(stateAfterReducer).not.toBe(mockedStatePart);
    expect(stateAfterReducer).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          genres: [expectedPayload],
          page: 1,
        },
      },
    });


    expect(moviesReducer(stateAfterReducer, { type: TOGGLE_GENRE, payload: expectedPayload })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          genres: [],
          page: 1,
        },
      },
    });
  });

  it('returns proper state when user reset filters', () => {
    //check if reducer is clean function
    expect(moviesReducer(mockedStatePart, { type: RESET_FILTERS })).not.toBe(mockedStatePart);
    expect(moviesReducer(mockedStatePart, { type: RESET_FILTERS })).toEqual({
      ...mockedStatePart,
      filtersFor: {
        ...mockedStatePart.filtersFor,
        all: {
          ...mockedStatePart.filtersFor.all,
          searchText: '',
          playTime: 'all',
          filter: 'all',
          genres: [],
          page: 1,
        },
      },
    });
  });
});

