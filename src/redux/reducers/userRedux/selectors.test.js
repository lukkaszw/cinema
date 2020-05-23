import {
  getIsLoading,
  getIsError,
  getUserData,
} from './userRedux';

const mockedData = {
  name: 'Somename',
}

const mockedState = {
  user: {
    data: mockedData,
    loading: {
      isActive: false,
      isError: false,
    },
  },
};

const mockedStateWhenLoading = {
  user: {
    data: {},
    loading: {
      isActive: true,
      isError: false,
    }
  }
}

const mockedStateWhenError = {
  user: {
    data: {},
    loading: {
      isActive: false,
      isError: true,
    }
  }
}

describe('User reducer - selectors', () => {
  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(getIsLoading(mockedState)).toBe(false);
      expect(getIsLoading(mockedStateWhenError)).toBe(false);
      expect(getIsLoading(mockedStateWhenLoading)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(getIsError(mockedState)).toBe(false);
      expect(getIsError(mockedStateWhenError)).toBe(true);
      expect(getIsError(mockedStateWhenLoading)).toBe(false);
    });
  });

  describe('getUserData selector', () => {
    it('returns proper data', () => {
      expect(getUserData(mockedState)).toEqual(mockedData);
      expect(getUserData(mockedStateWhenError)).toEqual({});
      expect(getUserData(mockedStateWhenLoading)).toEqual({});
    });
  });
});