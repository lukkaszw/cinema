import selectors from './selectors';

const mockedData = {
  title: 'test title',
};

const mockedStore = {
  moviePage: {
    data: mockedData,
    loading: {
      isActive: false,
      isError: false,
    }
  }
};

describe('MoviePage Reducer - selectors', () => {
  describe('getData selector', () => {
    it('returns proper data', () => {
      expect(selectors.getData(mockedStore)).toEqual(mockedData);
      const anotherExpectedData = {
        title: 'test title 2',
        details: {
          description: 'dada',
        }
      };
      mockedStore.moviePage.data = anotherExpectedData;
      expect(selectors.getData(mockedStore)).toEqual(anotherExpectedData);
    });
  });

  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(selectors.getIsLoading(mockedStore)).toBe(false);

      const stateWithActiveLoading = {
        moviePage: {
          data: [],
          loading: {
            isActive: true,
            isError: false,
          },
        }
      };

      expect(selectors.getIsLoading(stateWithActiveLoading)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsError(mockedStore)).toBe(false);

      const stateWithActiveLoading = {
        moviePage: {
          data: [],
          loading: {
            isActive: false,
            isError: true,
          },
        }
      };

      expect(selectors.getIsError(stateWithActiveLoading)).toBe(true);
    });
  });
});