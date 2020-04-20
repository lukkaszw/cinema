import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  fetchMoviePageData,
} from './moviePageRedux';
import {
  START_LOADING,
  SET_DATA,
  SET_ERROR,
} from './moviePageRedux';

const initialStatePart =   {
  data: [],
  loading: {
    isActive: false,
    isError: false,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialStatePart,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data })
const mockError = error => ({ status: 500, response: error })

describe('MoviePage Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create proper actions with proper data when fetching is succeded', () => {
    const response = {
      title: 'Test title',
    }
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: START_LOADING },
      { type: SET_DATA, payload: response },
    ];
 
    return store.dispatch(fetchMoviePageData())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('create proper actions when fetching is error', () => {
    const response = { error: 'test '};
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(response));
    });

    const expected = [
      { type: START_LOADING },
      { type: SET_ERROR },
    ];

    return store.dispatch(fetchMoviePageData())
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

});