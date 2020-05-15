import searchPanelReducer from './searchPanelRedux';
import {
  START_SEARCHING,
  SET_FOUND_DATA,
  SET_ERROR,
  RESET_QUERY,
} from './searchPanelRedux';

const mockedStatePart = {
  searchPanel: {
    data: [],
    lastQuery: '',
    loading: {
      isActive: false,
      isError: false,
    },
  },
};

describe('SearchPanel reducer', () => {
  it('returns the same state if action type is other than defined actions', () => {
    expect(searchPanelReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(searchPanelReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(searchPanelReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(searchPanelReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(searchPanelReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(searchPanelReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state if app is starting searching data', () => {
    const mockedPayload = 'search text';
    //check if reducer is clean function
    expect(searchPanelReducer(mockedStatePart, { payload: mockedPayload, type: START_SEARCHING })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(searchPanelReducer(mockedStatePart, { payload: mockedPayload, type: START_SEARCHING })).toEqual({
      data: [],
      query: mockedPayload,
      loading: {
        isActive: true,
        isError: false,
      },
    });
  });

  it('returns proper state if user found some movies', () => {
    const mockedPayload = ['Movie 1', 'Movie 2'];
    //check if reducer is clean function
    expect(searchPanelReducer(mockedStatePart, { payload: mockedPayload, type: SET_FOUND_DATA })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(searchPanelReducer(mockedStatePart, { payload: mockedPayload, type: SET_FOUND_DATA })).toEqual({
      ...mockedStatePart,
      data: mockedPayload,
      loading: {
        isActive: false,
        isError: false,
      },
    });
  });

  it('returns proper state if error occured', () => {
    //check if reducer is clean function
    expect(searchPanelReducer(mockedStatePart, { type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(searchPanelReducer(mockedStatePart, { type: SET_ERROR })).toEqual({
      ...mockedStatePart,
      data: [],
      loading: {
        isActive: false,
        isError: true,
      },
    });
  });

  it('returns proper state if user reset query', () => {
    const stateWithDataAndQuery = {
      data: [{ _id: '1', title: 'Title 1' }],
      query: 'dummy query',
      loading: {
        isActive: true,
        isError: false,
      }
    }
    //check if reducer is clean function
    expect(searchPanelReducer(stateWithDataAndQuery, { type: RESET_QUERY })).not.toBe(stateWithDataAndQuery);
    //check if reducer returns proper state
    expect(searchPanelReducer(stateWithDataAndQuery, { type: RESET_QUERY })).toEqual({
      data: [],
      query: '',
      loading: {
        isActive: false,
        isError: false,
      },
    });
  });
})
