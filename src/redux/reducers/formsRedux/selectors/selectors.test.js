import selectors from './selectors';

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
      expect(selectors.getIsSending(mockedInitialState)).toBe(false);
      expect(selectors.getIsSending(stateWhenSending)).toBe(true);
    });
  });

  describe('getIsError', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsError(mockedInitialState)).toBe(false);
      expect(selectors.getIsError(stateWhenError)).toBe(true);
    });

  });

  describe('getIsSuccess', () => {
    it('returns proper success state', () => {
      expect(selectors.getIsSuccess(mockedInitialState)).toBe(false);
      expect(selectors.getIsSuccess(stateWhenSuccess)).toBe(true);
    });

  });

  describe('getMessage', () => {
    it('returns proper message', () => {
      expect(selectors.getMessage(mockedInitialState)).toBe('');
      const expectedErrorMsg = 'Error!';
      expect(selectors.getMessage(stateWhenError)).toBe(expectedErrorMsg);
      const expectedSuccessMsg = 'Success!';
      expect(selectors.getMessage(stateWhenSuccess)).toBe(expectedSuccessMsg);
    });
  })

  describe('getDestination', () => {
    it('returns proper destination', () => {
      expect(selectors.getDestination(mockedInitialState)).toBe('some-destination');
    });
  })
})