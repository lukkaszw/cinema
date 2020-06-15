import selectors from './selectors';

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
  describe('getCurrentMovies selector', () => {
    it('returns proper movies data', () => {
      checkMoviesFilter('current', 'all', selectors.getCurrentMovies, mockedData.slice(0, 3));
      checkMoviesFilter('current', '2d', selectors.getCurrentMovies, [mockedData[0]]);
      checkMoviesFilter('current', '3d', selectors.getCurrentMovies, [mockedData[1]]);
      checkMoviesFilter('current', 'for kids', selectors.getCurrentMovies, [mockedData[2]]);
    });
  });

  
  describe('getSoonMovies selector', () => {
    it('returns proper movies data', () => {
      expect(selectors.getSoonMovies(mockedState)).toEqual(mockedData.slice(3, 5));
    });
  });

  describe('checkIfDataFetched selector', () => {
    it('informs if data are fetched', () => {
      expect(selectors.checkIfDataFetched(mockedState)).toBe(true);
      const stateWithoutData = JSON.parse(JSON.stringify(mockedState));
      stateWithoutData.movies.data = [];
      expect(selectors.checkIfDataFetched(stateWithoutData)).toBe(false);
    })
  });

  describe('getAllMoviesFilter selector', () => {
    it('returns proper filter state', () => {
      expect(selectors.getAllMoviesFilter(mockedState)).toBe('all');
    
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
  
      expect(selectors.getAllMoviesFilter(stateWithOtherFilter)).toBe('other');
    });
  });

  describe('getCurrentMoviesFilter selector', () => {
    it('returns proper filter state', () => {
      expect(selectors.getCurrentMoviesFilter(mockedState)).toBe('all');
    
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
  
      expect(selectors.getCurrentMoviesFilter(stateWithOtherFilter)).toBe('other');
    });
  });

  describe('getIsLoading selector', () => {
    it('returns proper loading state', () => {
      expect(selectors.getIsLoading(mockedState)).toBe(false);

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

      expect(selectors.getIsLoading(stateWithActiveLoading)).toBe(true);
    });
  });

  describe('getIsError selector', () => {
    it('returns proper error state', () => {
      expect(selectors.getIsError(mockedState)).toBe(false);

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

      expect(selectors.getIsError(stateWithActiveLoading)).toBe(true);
    });
  });

  describe('getSearchText selector', () => {
    it('returns proper searchText value', () => {
      expect(selectors.getSearchText(mockedState)).toBe('');

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

      expect(selectors.getSearchText(stateWihAnotherText)).toBe(mockedText);
    });
  });

  describe('getAllMoviesPage selector', () => {
    it('returns proper page', () => {
      expect(selectors.getAllMoviesPage(mockedState)).toBe(1);
    });
  });

  describe('getPlayTimeFilter selector', () => {
    it('returns proper play time filter', () => {
      expect(selectors.getPlayTimeFilter(mockedState)).toBe('all');
    });
  });

  describe('getSortFilter selector', () => {
    it('returns proper sort by filter', () => {
      expect(selectors.getSortFilter(mockedState)).toBe('asc');
    });
  });

  describe('getGenresFilter selector', () => {
    it('returns poper genres filter', () => {
      expect(selectors.getGenresFilter(mockedState)).toEqual([]);
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

      expect(selectors.getGenresFilter(stateWithOtherGenres)).toEqual(['Comedy', 'Action']);
    });
  })
});