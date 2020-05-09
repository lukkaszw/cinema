import {
  getAllMovies,
  getIsLoading,
  getIsError,
  getAllMoviesFilter,
  getCurrentMoviesFilter,
  getCurrentMovies,
  getSoonMovies,
  checkIfDataFetched,
} from './moviesRedux';

const mockedData =  [
  {
    _id: '1',
    title: 'Movie 1',
    filters: ['2d'],
    played: 'current',
  },
  {
    _id: '2',
    title: 'Movie 2',
    filters: ['3d'],
    played: 'current',
  },
  {
    _id: '3',
    title: 'Movie 3',
    filters: ['for kids'],
    played: 'current',
  },
  {
    _id: '4',
    title: 'Movie 4',
    played: 'soon',
  },
  {
    _id: '5',
    title: 'Movie 5',
    played: 'soon',
  },
];

const mockedState = {
  movies: {
    data: mockedData,
    filters: {
      all: 'all',
      current: 'all',
    },
    loading: {
      isActive: false,
      isError: false,
    }
  },
};

const checkMoviesFilter = (filterType, filter, selector, expectedMovies) => {
  const stateWithFilter = JSON.parse(JSON.stringify(mockedState));
  stateWithFilter.movies.filters[filterType] = filter;
  expect(selector(stateWithFilter)).toEqual(expectedMovies);
}

describe('Movies Reducer selectors', () => {
  describe('getAllMovies selector', () => {
    it('returns proper movies data', () => {
      checkMoviesFilter('all', 'all', getAllMovies, mockedData);
      checkMoviesFilter('all', '2d', getAllMovies, [mockedData[0]]);
      checkMoviesFilter('all', '3d', getAllMovies, [mockedData[1]]);
      checkMoviesFilter('all', 'for kids', getAllMovies, [mockedData[2]]);
    });
  });

  describe('getCurrentMovies selector', () => {
    it('returns proper movies data', () => {
      checkMoviesFilter('current', 'all', getCurrentMovies, mockedData.slice(0, 3));
      checkMoviesFilter('current', '2d', getCurrentMovies, [mockedData[0]]);
      checkMoviesFilter('current', '3d', getCurrentMovies, [mockedData[1]]);
      checkMoviesFilter('current', 'for kids', getCurrentMovies, [mockedData[2]]);
    });
  });

  
  describe('getSoonMovies selector', () => {
    it('returns proper movies data', () => {
      expect(getSoonMovies(mockedState)).toEqual(mockedData.slice(3, 5));
    });
  });

  describe('checkIfDataFetched selector', () => {
    it('informs if data are fetched', () => {
      expect(checkIfDataFetched(mockedState)).toBe(true);
      const stateWithoutData = JSON.parse(JSON.stringify(mockedState));
      stateWithoutData.movies.data = [];
      expect(checkIfDataFetched(stateWithoutData)).toBe(false);
    })
  });

  describe('getAllMoviesFilter selector', () => {
    it('returns proper filter state', () => {
      expect(getAllMoviesFilter(mockedState)).toBe('all');
    
      const stateWithOtherFilter = {
        movies: {
          data: [],
          filters: {
            all: 'other',
            current: 'all',
          },
          loading: {
            isActive: false,
            isError: false,
          }
        }
      }
  
      expect(getAllMoviesFilter(stateWithOtherFilter)).toBe('other');
    });
  });

  describe('getCurrentMoviesFilter selector', () => {
    it('returns proper filter state', () => {
      expect(getCurrentMoviesFilter(mockedState)).toBe('all');
    
      const stateWithOtherFilter = {
        movies: {
          data: [],
          filters: {
            all: 'all',
            current: 'other',
          },
          loading: {
            isActive: false,
            isError: false,
          }
        }
      }
  
      expect(getCurrentMoviesFilter(stateWithOtherFilter)).toBe('other');
    });
  });

  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(getIsLoading(mockedState)).toBe(false);

      const stateWithActiveLoading = {
        movies: {
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
        movies: {
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