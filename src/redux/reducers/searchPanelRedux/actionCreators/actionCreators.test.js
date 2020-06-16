import actionCreators from './actionCreators';
import actions from '../actions/actions';

describe('Search panel reducers action creators', () => {
  it('creates proper action when user is starting to search', () => {
    const mockedSearchText = 'search text';

    const expectedAction = {
      payload: mockedSearchText,
      type: actions.START_FETCHING,
    };
    expect(actionCreators.startSearching(mockedSearchText)).toEqual(expectedAction);
  });

  it('creates proper action when user found some data', () => {
    const mockedData = ['data 1', 'data 2'];
    const expectedAction = {
      payload: mockedData,
      type: actions.SET_FETCH_DATA, 
    };
    expect(actionCreators.setFoundData(mockedData)).toEqual(expectedAction);
  });

  it('creates proper action when searching data was completed with error', () => {
    const expectedAction = {
      type: actions.SET_FETCH_ERROR, 
    };
    expect(actionCreators.setError()).toEqual(expectedAction);
  });

  it('creates proper action when user reset query', () => {
    const expectedAction = {
      type: actions.RESET_QUERY, 
    };
    expect(actionCreators.resetQuery()).toEqual(expectedAction);
  });
});