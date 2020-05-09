import {
  startFetching,
  fetchError,
  fetchSucceded,
  setPage,
  changeSearchText,
} from './scheduleRedux';

import { 
  START_FETCHING,
  SET_ERROR,
  SET_DATA,
  SET_PAGE,
  CHANGE_SEARCH_TEXT,
} from './scheduleRedux';

describe('Schedule Reducer actions', () => {
  it('creates proper action when data is fetching', () => {
    const expectedAction = {
      type: START_FETCHING,
    }
    expect(startFetching()).toEqual(expectedAction);
  });

  
  it('creates proper action when error is occured', () => {
    const expectedAction = {
      type: SET_ERROR,
    };
    expect(fetchError()).toEqual(expectedAction);
  });

  it('creates proper action when fetching is succeded', () => {
    const payloadData = [
      'schedule1',
      'schedule2'
    ];

    const expectedAction = {
      type: SET_DATA,
      payload: payloadData,
    };
    expect(fetchSucceded(payloadData)).toEqual(expectedAction);
  });

  
  it('creates proper action when setPage', () => {
    const payloadData = 2;

    const expectedAction = {
      type: SET_PAGE,
      payload: 2,
    };
    expect(setPage(payloadData)).toEqual(expectedAction);
  });
  
  it('creates proper action when change searchText', () => {
    const payloadData = 'text';

    const expectedAction = {
      type: CHANGE_SEARCH_TEXT,
      payload: 'text',
    };
    expect(changeSearchText(payloadData)).toEqual(expectedAction);
  });
});