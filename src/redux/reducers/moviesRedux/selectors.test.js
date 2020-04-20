import {
  getAllMovies,
  getIsLoading,
  getIsError,
  getFilter,
} from './moviesRedux';

const mockedData =  [
  {
    _id: '1',
    title: 'Movie 1',
    filters: ['2d']
  },
  {
    _id: '2',
    title: 'Movie 2',
    filters: ['3d'],
  },
  {
    _id: '3',
    title: 'Movie 3',
    filters: ['for kids'],
  },
];

const mockedState = {
  movies: {
    data: mockedData,
    filter: 'all',
    loading: {
      isActive: false,
      isError: false,
    }
  },
};

describe('Movies Reducer selectors', () => {
  describe('getAllMovies selector', () => {
    it('returns proper movies data', () => {
      expect(getAllMovies(mockedState)).toEqual(mockedData);
    });

    const stateWith2dFilter = JSON.parse(JSON.stringify(mockedState));
    stateWith2dFilter.movies.filter = '2d';
    expect(getAllMovies(stateWith2dFilter)).toEqual([mockedData[0]]);

    const stateWith3dFilter = JSON.parse(JSON.stringify(mockedState));
    stateWith3dFilter.movies.filter = '3d';
    expect(getAllMovies(stateWith3dFilter)).toEqual([mockedData[1]]);

    const stateWithForKidsFilter = JSON.parse(JSON.stringify(mockedState));
    stateWithForKidsFilter.movies.filter = 'for kids';
    expect(getAllMovies(stateWithForKidsFilter)).toEqual([mockedData[2]]);
  });

  describe('getFilter selector', () => {
    it('returns proper filter state', () => {
      expect(getFilter(mockedState)).toBe('all');
    
      const stateWithOtherFilter = {
        movies: {
          data: [],
          filter: 'other',
          loading: {
            isActive: false,
            isError: false,
          }
        }
      }
  
      expect(getFilter(stateWithOtherFilter)).toBe('other');
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