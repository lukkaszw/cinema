import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  searchMovies
} from './searchPanelRedux';
import {
  START_SEARCHING,
  SET_FOUND_DATA,
  SET_ERROR,
} from './searchPanelRedux';

const initialState =   {
  data: [],
  query: '',
  loading: {
    isActive: false,
    isError: false,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialState,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 500, response: error });

describe('SearchPanel reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create proper actions with proper data when searching is succeded', () => {
    const response = ['test1', 'test2'];
    const mockedQuery = 'query';
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: START_SEARCHING, payload: mockedQuery },
      { type: SET_FOUND_DATA, payload: response },
    ];
 
    return store.dispatch(searchMovies(mockedQuery))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('create proper actions when searching ended with error', () => {
    const response = { error: 'test '};
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(response));
    });

    const mockedQuery = 'some movie';

    const expected = [
      { type: START_SEARCHING, payload: mockedQuery },
      { type: SET_ERROR },
    ];

    return store.dispatch(searchMovies(mockedQuery))
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});