import {
  getFutureMovies,
  getIsLoading,
  getIsError,
} from './futureMoviesRedux';

const mockedState = {
  futureMovies: {
    data: [
      {
        _id: '1',
        title: 'Movie 1',
      },
      {
        _id: '2',
        title: 'Movie 2',
      }
    ],
    loading: {
      isActive: false,
      isError: false,
    }
  },
}

describe('FutureMovies Reducer - selectors', () => {
  describe('getFutureMovies selector', () => {
    it('returns proper data', () => {
      expect(getFutureMovies(mockedState)).toEqual(
        [
          {
            _id: '1',
            title: 'Movie 1',
          },
          {
            _id: '2',
            title: 'Movie 2',
          }
        ],
      );
    });
  });

  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(getIsLoading(mockedState)).toBe(false);

      const stateWithActiveLoading = {
        futureMovies: {
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
      expect(getIsError(mockedState)).toBe(false);

      const stateWithActiveLoading = {
        futureMovies: {
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