import {
  getAllMovies,
  getIsLoading,
  getIsError,
  getAllMoviesFilter,
  getCurrentMoviesFilter,
  getCurrentMovies,
  getSoonMovies,
  checkIfDataFetched,
  getSearchText,
  getAllMoviesPage,
  getPlayTimeFilter,
  getSortFilter,
  getGenresFilter,
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
    filtersFor: {
      all: {
        filter: 'all',
        searchText: '',
        playTime: 'all',
        sort: 'asc',
        genres: [],
        page: 1,
      },
      current: 'all',
    },
    loading: {
      isActive: false,
      isError: false,
    }
  },
};

const checkMoviesFilter = (filterType, filter, selector, expectedMovies, textFilter = '') => {
  const stateWithFilter = JSON.parse(JSON.stringify(mockedState));
  if(filterType === 'all') {
    stateWithFilter.movies.filtersFor.all.filter = filter;
  } else {
    stateWithFilter.movies.filtersFor.current = filter;
  }
  stateWithFilter.movies.filtersFor.all.searchText = textFilter;
  expect(selector(stateWithFilter)).toEqual(expectedMovies);
}

describe('Movies Reducer selectors', () => {
  describe('getAllMovies selector', () => {
    it('returns proper movies data', () => {
      //check filters
      checkMoviesFilter('all', 'all', getAllMovies, mockedData);
      // checkMoviesFilter('all', '2d', getAllMovies, [mockedData[0]]);
      // checkMoviesFilter('all', '3d', getAllMovies, [mockedData[1]]);
      // checkMoviesFilter('all', 'for kids', getAllMovies, [mockedData[2]]);
      // //check with textFilter
      // checkMoviesFilter('all', 'all', getAllMovies, mockedData, '');
      // checkMoviesFilter('all', 'all', getAllMovies, mockedData, 'movie');
      // checkMoviesFilter('all', 'all', getAllMovies, mockedData, 'MoV');
      // checkMoviesFilter('all', 'all', getAllMovies, [mockedData[0]], '1');
      // checkMoviesFilter('all', 'all', getAllMovies, [mockedData[4]], '5');
      // checkMoviesFilter('all', 'all', getAllMovies, [], '6');
      // //mixed examples
      // checkMoviesFilter('all', '3d', getAllMovies, [mockedData[1]], 'movie');
      // checkMoviesFilter('all', '3d', getAllMovies, [mockedData[1]], 'M');
      // checkMoviesFilter('all', '3d', getAllMovies, [mockedData[1]], '');
      // checkMoviesFilter('all', '3d', getAllMovies, [mockedData[1]], '2');
      // checkMoviesFilter('all', '3d', getAllMovies, [], '3');
      // checkMoviesFilter('all', '2d', getAllMovies, [], '5');
      // checkMoviesFilter('all', 'for kids', getAllMovies, [mockedData[2]], '3');
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
          filtersFor: {
            all: {
              filter: 'other',
              searchText: '',
              page: 1,
            },
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
          filtersFor: {
            all: {
              filter: 'all',
              searchText: '',
              page: 1,
            },
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
          filtersFor: {
            all: {
              filter: 'all',
              searchText: '',
              page: 1,
            },
            current: 'all',
          },
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
          filtersFor: {
            all: {
              filter: 'all',
              searchText: '',
              page: 1,
            },
            current: 'all',
          },
          loading: {
            isActive: false,
            isError: true,
          },
        }
      };

      expect(getIsError(stateWithActiveLoading)).toBe(true);
    });
  });

  describe('getSearchText selector', () => {
    it('returns proper searchText value', () => {
      expect(getSearchText(mockedState)).toBe('');

      const mockedText = 'another text';
      const stateWihAnotherText = {
        ...mockedState,
        movies: {
          ...mockedState.movies,
          filtersFor: {
            all: {
              filter: 'all',
              searchText: 'another text',
              page: 1,
            },
            current: 'all',
          },
        }
      };

      expect(getSearchText(stateWihAnotherText)).toBe(mockedText);
    });
  });

  describe('getAllMoviesPage selector', () => {
    it('returns proper page', () => {
      expect(getAllMoviesPage(mockedState)).toBe(1);
    });
  });

  describe('getPlayTimeFilter selector', () => {
    it('returns proper play time filter', () => {
      expect(getPlayTimeFilter(mockedState)).toBe('all');
    });
  });

  describe('getSortFilter selector', () => {
    it('returns proper sort by filter', () => {
      expect(getSortFilter(mockedState)).toBe('asc');
    });
  });

  describe('getGenresFilter selector', () => {
    it('returns poper genres filter', () => {
      expect(getGenresFilter(mockedState)).toEqual([]);
      const stateWithOtherGenres = {
        movies: {
          ...mockedState.movies,
          filtersFor: {
            ...mockedState.movies.filtersFor,
            all: {
              ...mockedState.movies.filtersFor.all,
              genres: ['Comedy', 'Action'],
            },
          },
        },
      };

      expect(getGenresFilter(stateWithOtherGenres)).toEqual(['Comedy', 'Action']);
    });
  })
});