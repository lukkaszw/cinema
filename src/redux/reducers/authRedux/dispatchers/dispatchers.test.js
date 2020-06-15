import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import dispatchers from './dispatchers';
import actions from '../actions/actions';

const mockedToken = 'somedummytoken';

const initialState = {};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const makeMockStore = (state = initialState) => { 
  return mockStore({
    ...state,
  })
}

describe('checkStartAuthStatus', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates proper actions when tkn item exists in localStorage', () => {
    localStorage.setItem('tkn', mockedToken);


    const store = makeMockStore();

    const expected = [
      { type: actions.LOGIN, payload: mockedToken },
    ];

    store.dispatch(dispatchers.checkStartAuthStatus());
    expect(store.getActions()).toEqual(expected);
  });

  it('creates no actions when tkn item does not exist in localStorage', () => {
    localStorage.clear();


    const store = makeMockStore();

    const expected = [];

    store.dispatch(dispatchers.checkStartAuthStatus());
    expect(store.getActions()).toEqual(expected);
  });
});