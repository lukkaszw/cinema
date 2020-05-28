import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  sendReadNews
} from './userRedux';
import {
  SET_NEWS_AS_READ,
} from './userRedux';

const initialState =   {
  data: {
    news: [{
        _id: '1',
        isRead: false,
      },
      {
        _id: '2',
        isRead: false,
      }
    ],
  },
  loading: {
    isActive: false,
    isError: false,
  },
};

const mockedToken = 'sometoken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...initialState,
    ...state,
  })
}

const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 500, response: error })


describe('User Reducer async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates proper actions with proper data when sending info about news as read', () => {
    const response = {};
    const store = makeMockStore();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess(response));
    });

    const expectedId = '2';

    const expected = [
      { type: SET_NEWS_AS_READ, payload: expectedId },
    ];
 
    return store.dispatch(sendReadNews(mockedToken, expectedId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('creates no actions when error occured', () => {
    const store = makeMockStore();
    const response = {};
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(response));
    });

    const expectedId = '2';

    const expected = [];
 
    return store.dispatch(sendReadNews(mockedToken, expectedId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});