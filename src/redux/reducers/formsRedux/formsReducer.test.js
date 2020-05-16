import formsReducer, { resetAll } from './formsRedux';
import {
  START_SENDING,
  SET_ERROR,
  SET_SUCCESS,
  RESET_ALL,
} from './formsRedux';

const mockedStatePart = {
  sending: {
    isActive: false,
    isError: false,
    isSuccess: false,
  },
  message: '',
  validation: [],
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
     //check if reducer is clean function
     expect(formsReducer(mockedStatePart, { type: START_SENDING })).not.toBe(mockedStatePart);
     //check if reducer returns proper state
     expect(formsReducer(mockedStatePart, { type: START_SENDING })).toEqual({
       sending: {
         isActive: true,
         isError: false,
         isSuccess: false,
       },
       message: '',
      validation: [],
     });
  });

  it('returns proper state when sending data was successfull', () => {
    const expectedMsg = 'Success!';
    //check if reducer is clean function
    expect(formsReducer(mockedStatePart, { payload: expectedMsg, type: SET_SUCCESS })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(formsReducer(mockedStatePart, { payload: expectedMsg, type: SET_SUCCESS })).toEqual({
      sending: {
        isActive: false,
        isError: false,
        isSuccess: true,
      },
      message: expectedMsg,
      validation: [],
    });
  });

  it('returns proper state when error occurred', () => {
    const expectedPayload = {
      error: 'Error!',
      validation: [{ name: 'name', error: 'Valida name!' }],
    };
    //check if reducer is clean function
    expect(formsReducer(mockedStatePart, { payload: expectedPayload, type: SET_ERROR })).not.toBe(mockedStatePart);
    //check if reducer returns proper state
    expect(formsReducer(mockedStatePart, { payload: expectedPayload, type: SET_ERROR })).toEqual({
      sending: {
        isActive: false,
        isError: true,
        isSuccess: false,
      },
      message: expectedPayload.error,
      validation: expectedPayload.validation,
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