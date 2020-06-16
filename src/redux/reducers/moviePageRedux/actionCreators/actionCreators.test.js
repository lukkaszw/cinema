import actionCreators from './actionCreators';
import actions from '../actions/actions';

describe('MoviePage reducer actions', () => {
  it('starts loading action when data is starting to fetch', () => {
    const expectedAction = {
      type: actions.START_FETCHING,
    };
    expect(actionCreators.startFetching()).toEqual(expectedAction);
  });

  it('starts setting data action with proper data when fetching was succeded', () => {
    const expectedData = {
      test: 'test data',
    };
    const expectedAction = {
      type: actions.SET_FETCH_DATA,
      payload: expectedData,
    };

    expect(actionCreators.setData(expectedData)).toEqual(expectedAction);
  });

  it('starts setting error action when fetching data was ended with error', () => {
    const expectedAction = {
      type: actions.SET_FETCH_ERROR,
    };

    expect(actionCreators.setError()).toEqual(expectedAction);
  });
});