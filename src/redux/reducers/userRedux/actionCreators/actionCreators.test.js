import actionCreators from '../actionCreators/actionCreators';
import actions from '../actions/actions';

describe('User reducer - action creators', () => {
  it('creates proper action when starting fetching data', () => {
    const expectedAction = {
      type: actions.START_FETCHING,
    };

    expect(actionCreators.startFetching()).toEqual(expectedAction);
  });

  it('creates proper action when fetching data was succeded', () => {
    const payloadData = {
      name: 'Somename',
      surname: 'Sumsurname',
      phone: '666 666 666',
      email: 'email@wp.pl',
    };

    const expectedAction = {
      type: actions.SET_FETCH_DATA, payload: payloadData,
    };

    expect(actionCreators.setFetchData(payloadData)).toEqual(expectedAction);
  });

  it('creates proper action when fetching data was ended with error', () => {
    const expectedAction = {
      type: actions.SET_FETCH_ERROR,
    };

    expect(actionCreators.setFetchError()).toEqual(expectedAction);
  });

  it('creates proper action when news is set as read', () => {
    const mockedNewsId = 'somenewsId';

    const expectedAction = {
      type: actions.SET_NEWS_AS_READ,
      payload: mockedNewsId,
    };

    expect(actionCreators.setNewsAsRead(mockedNewsId)).toEqual(expectedAction);
  });
});