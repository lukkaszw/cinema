import {
  getData,
  getIsLoading,
  getIsError,
} from './moviePageRedux';

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
      expect(getData(mockedStore)).toEqual(mockedData);
      const anotherExpectedData = {
        title: 'test title 2',
        details: {
          description: 'dada',
        }
      };
      mockedStore.moviePage.data = anotherExpectedData;
      expect(getData(mockedStore)).toEqual(anotherExpectedData);
    });
  });

  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(getIsLoading(mockedStore)).toBe(false);

      const stateWithActiveLoading = {
        moviePage: {
          data: [],
          loading: {
            isActive: true,
            isError: false,
          },
        }
      };

      expect(getIsLoading(stateWithActiveLoading)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(getIsError(mockedStore)).toBe(false);

      const stateWithActiveLoading = {
        moviePage: {
          data: [],
          loading: {
            isActive: false,
            isError: true,
          },
        }
      };

      expect(getIsError(stateWithActiveLoading)).toBe(true);
    });
  });
});