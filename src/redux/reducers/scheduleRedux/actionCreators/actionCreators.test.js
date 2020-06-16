import actionCreators from './actionCreators';
import actions from '../actions/actions';

describe('Schedule Reducer actions', () => {
  it('creates proper action when data is fetching', () => {
    const expectedAction = {
      type: actions.START_FETCHING,
    }
    expect(actionCreators.startFetching()).toEqual(expectedAction);
  });

  it('creates proper action when error is occured', () => {
    const expectedAction = {
      type: actions.SET_FETCH_ERROR,
    };
    expect(actionCreators.fetchError()).toEqual(expectedAction);
  });

  it('creates proper action when fetching is succeded', () => {
    const payloadData = [
      'schedule1',
      'schedule2'
    ];

    const expectedAction = {
      type: actions.SET_FETCH_DATA,
      payload: payloadData,
    };
    expect(actionCreators.fetchSucceded(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when setPage', () => {
    const payloadData = 2;

    const expectedAction = {
      type: actions.SET_PAGE,
      payload: 2,
    };
    expect(actionCreators.setPage(payloadData)).toEqual(expectedAction);
  });
  
  it('creates proper action when change searchText', () => {
    const payloadData = 'text';

    const expectedAction = {
      type: actions.CHANGE_SEARCH_TEXT,
      payload: 'text',
    };
    expect(actionCreators.changeSearchText(payloadData)).toEqual(expectedAction);
  });
});