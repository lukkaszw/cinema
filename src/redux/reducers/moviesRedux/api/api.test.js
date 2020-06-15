import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import API from './api';
import actions from '../actions/actions';

const initialState =   {
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
    ...initialState,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data })
const mockError = error => ({ status: 500, response: error })




describe('Movies Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create proper actions with proper data when fetching is succeded', () => {
    const response = ['test1', 'test2'];
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expected = [
      { type: actions.START_FETCHING },
      { type: actions.SET_DATA, payload: response },
    ];
 
    return store.dispatch(API.fetchMoviesData())
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
      { type: actions.START_FETCHING },
      { type: actions.SET_ERROR },
    ];

    return store.dispatch(API.fetchMoviesData())
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});