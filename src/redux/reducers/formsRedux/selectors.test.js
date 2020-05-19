import {
  getIsSending,
  getIsError,
  getIsSuccess,
  getMessage,
  getValidation,
  getDestination,
} from './formsRedux';


const mockedInitialState = {
  formsState: {
    destination: 'some-destination',
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
    it('returns proper error state', () => {
      expect(getIsError(mockedInitialState)).toBe(false);
      expect(getIsError(stateWhenError)).toBe(true);
    });

  });

  describe('getIsSuccess', () => {
    it('returns proper success state', () => {
      expect(getIsSuccess(mockedInitialState)).toBe(false);
      expect(getIsSuccess(stateWhenSuccess)).toBe(true);
    });

  });

  describe('getMessage', () => {
    it('returns proper message', () => {
      expect(getMessage(mockedInitialState)).toBe('');
      const expectedErrorMsg = 'Error!';
      expect(getMessage(stateWhenError)).toBe(expectedErrorMsg);
      const expectedSuccessMsg = 'Success!';
      expect(getMessage(stateWhenSuccess)).toBe(expectedSuccessMsg);
    });
  })

  describe('getDestination', () => {
    it('returns proper destination', () => {
      expect(getDestination(mockedInitialState)).toBe('some-destination');
    });
  })
})