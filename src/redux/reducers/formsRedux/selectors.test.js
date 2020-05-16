import {
  getIsSending,
  getIsError,
  getIsSuccess,
  getMessage,
  getValidation,
} from './formsRedux';


const mockedInitialState = {
  formsState: {
    sending: {
      isActive: false,
      isError: false,
      isSuccess: false,
    },
    message: '',
    validation: [],
  },
};

const stateWhenSending = {
  formsState: {
    ...mockedInitialState.formsState,
    sending: {
      isActive: true,
      isError: false,
      isSuccess: false,
    },
  },
};

const stateWhenSuccess = {
  formsState: {
    ...mockedInitialState.formsState,
    sending: {
      isActive: false,
      isError: false,
      isSuccess: true,
    },
    message: 'Success!',
  },
};

const stateWhenError = {
  formsState: {
    sending: {
      isActive: false,
      isError: true,
      isSuccess: false,
    },
    message: 'Error!',
    validation: [{ name: 'name', error: 'Valid name!' }],
  },
};

describe('Forms reducer - selectors', () => {
  describe('getIsSending', () => {
    it('returns proper sending state', () => {
      expect(getIsSending(mockedInitialState)).toBe(false);
      expect(getIsSending(stateWhenSending)).toBe(true);
    });
  });

  describe('getIsError', () => {
    expect(getIsError(mockedInitialState)).toBe(false);
    expect(getIsError(stateWhenError)).toBe(true);
  });

  describe('getIsSuccess', () => {
    expect(getIsSuccess(mockedInitialState)).toBe(false);
    expect(getIsSuccess(stateWhenSuccess)).toBe(true);
  })

  describe('getMessage', () => {
    expect(getMessage(mockedInitialState)).toBe('');
    const expectedErrorMsg = 'Error!';
    expect(getMessage(stateWhenError)).toBe(expectedErrorMsg);
    const expectedSuccessMsg = 'Success!';
    expect(getMessage(stateWhenSuccess)).toBe(expectedSuccessMsg);
  })

  describe('getValidation', () => {
    expect(getValidation(mockedInitialState)).toEqual([]);
    const expecetValidation = [{ name: 'name', error: 'Valid name!' }];
    expect(getValidation(stateWhenError)).toEqual(expecetValidation);
  });
})