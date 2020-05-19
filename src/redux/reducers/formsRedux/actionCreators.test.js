import {
  startSending,
  setError,
  setSuccess,
  resetAll,
} from './formsRedux';

import {
  START_SENDING,
  SET_ERROR, 
  SET_SUCCESS,
  RESET_ALL, 
} from './formsRedux';


describe('Forms reducer action creators', () => {
  it('creates proper action when user starts to send data', () => {
    const expectedDest = 'contact-form';

    const expectedAction = {
      type: START_SENDING,
      payload: expectedDest,
    };
    expect(startSending(expectedDest)).toEqual(expectedAction);
  });

  it('creates proper action when sending was successful', () => {
    const successMsg = 'Success!';
    
    const expectedAction = {
      payload: successMsg,
      type: SET_SUCCESS,
    };
    expect(setSuccess(successMsg)).toEqual(expectedAction);
  });

  it('creates proper action when error occured', () => {
    const payload = 'Error!';

    const expectedAction = {
      payload,
      type: SET_ERROR,
    };
    expect(setError(payload)).toEqual(expectedAction);
  });

  it('creates proper action when it is trying to reset forms state', () => {
    const expectedAction = {
      type: RESET_ALL,
    };
    expect(resetAll()).toEqual(expectedAction);
  });
});