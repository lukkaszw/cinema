import actionCreators from './actionCreators';
import actions from '../actions/actions';

describe('Forms reducer action creators', () => {
  it('creates proper action when user starts to send data', () => {
    const expectedDest = 'contact-form';

    const expectedAction = {
      type: actions.START_SENDING,
      payload: expectedDest,
    };
    expect(actionCreators.startSending(expectedDest)).toEqual(expectedAction);
  });

  it('creates proper action when sending was successful', () => {
    const successMsg = 'Success!';
    
    const expectedAction = {
      payload: successMsg,
      type: actions.SET_SEND_SUCCESS,
    };
    expect(actionCreators.setSendSuccess(successMsg)).toEqual(expectedAction);
  });

  it('creates proper action when error occured', () => {
    const payload = 'Error!';

    const expectedAction = {
      payload,
      type: actions.SET_SEND_ERROR,
    };
    expect(actionCreators.setSendError(payload)).toEqual(expectedAction);
  });

  it('creates proper action when it is trying to reset forms state', () => {
    const expectedAction = {
      type: actions.RESET_ALL,
    };
    expect(actionCreators.resetAll()).toEqual(expectedAction);
  });
});