import formsReducer from './formsRedux';
import {
  START_SENDING,
  SET_ERROR,
  SET_SUCCESS,
  RESET_ALL,
} from './formsRedux';

const mockedStatePart = {
  destination: null,
  sending: {
    isActive: false,
    isError: false,
    isSuccess: false,
  },
  message: '',
}

describe('Form reducer', () => {
  it('returns same state if action type is other than defined actions', () => {
    expect(formsReducer(mockedStatePart, { type: null })).toBe(mockedStatePart);
    expect(formsReducer(mockedStatePart, { type: undefined })).toBe(mockedStatePart);
    expect(formsReducer(mockedStatePart, { type: ''})).toBe(mockedStatePart);
    expect(formsReducer(mockedStatePart, { type: []})).toBe(mockedStatePart);
    expect(formsReducer(mockedStatePart, { type: {}})).toBe(mockedStatePart);
    expect(formsReducer(mockedStatePart, { type: 'TEST_ACTION'})).toBe(mockedStatePart);
  });

  it('returns proper state when user starts to sending data', () => {
    const expectedDestination = 'contact-form';
     //check if reducer is clean function
     expect(formsReducer(mockedStatePart, { type: START_SENDING, payload: expectedDestination })).not.toBe(mockedStatePart);
     //check if reducer returns proper state
     expect(formsReducer(mockedStatePart, { type: START_SENDING, payload: expectedDestination })).toEqual({
       destination: expectedDestination,
       sending: {
         isActive: true,
         isError: false,
         isSuccess: false,
       },
       message: '',
     });
  });

  it('returns proper state when sending data was successfull', () => {
    const expectedMsg = 'Success!';
    //check if reducer is clean function
    expect(formsReducer(mockedStatePart, { payload: expectedMsg, type: SET_SUCCESS })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(formsReducer(mockedStatePart, { payload: expectedMsg, type: SET_SUCCESS })).toEqual({
      ...mockedStatePart,
      sending: {
        isActive: false,
        isError: false,
        isSuccess: true,
      },
      message: expectedMsg,
    });
  });

  it('returns proper state when error occurred', () => {
    const expectedPayload = 'Error!';
    //check if reducer is clean function
    expect(formsReducer(mockedStatePart, { payload: expectedPayload, type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(formsReducer(mockedStatePart, { payload: expectedPayload, type: SET_ERROR })).toEqual({
      ...mockedStatePart,
      sending: {
        isActive: false,
        isError: true,
        isSuccess: false,
      },
      message: expectedPayload,
    });
  });

  it('returns proper state when it is reseted', () => {
        //check if reducer is clean function
        expect(formsReducer(mockedStatePart, { type: RESET_ALL })).not.toBe(mockedStatePart);
        //check if reducer returns proper state
        const someFullfilledState = {
          sending: {
            ...mockedStatePart.sending,
            isError: true,
          },
          message: 'Error',
        }
        expect(formsReducer(someFullfilledState, { type: RESET_ALL })).toEqual(mockedStatePart);
  });
});