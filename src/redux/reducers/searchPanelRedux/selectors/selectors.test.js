import selectors from './selectors';

const mockedData = [
  {
    _id: '1',
    title: 'title 1',
  },
  {
    _id: '2',
    title: 'title 2',
  }
];

const mockedQuery = 'dummy query';

const mockedState = {
  searchPanel: {
    data: mockedData,
    query: mockedQuery,
    loading: {
      isActive: false,
      isError: false,
    },
  },
};

describe('Search Panel reducer - selectors', () => {
  describe('getSearchedMovies selector', () => {
    it('returns proper data from state', () => {
      expect(selectors.getSearchedMovies(mockedState)).toEqual(mockedData);
    });
  });

  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(selectors.getIsLoading(mockedState)).toBe(false);
      const stateWhenLoading = {
        searchPanel: {
          ...mockedState.searchPanel,
          loading: {
            ...mockedState.loading,
            isActive: true,
          },
        }
      };

      expect(selectors.getIsLoading(stateWhenLoading)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsError(mockedState)).toBe(false);
      const stateWhenLoading = {
        searchPanel: {
          ...mockedState.searchPanel,
          loading: {
            ...mockedState.loading,
            isError: true,
          },
        }
      };

      expect(selectors.getIsError(stateWhenLoading)).toBe(true);
    });
  });

  describe('getQuery selector', () => {
    it('returns proper query state', () => {
      expect(selectors.getQuery(mockedState)).toBe(mockedQuery);
    });
  });
});