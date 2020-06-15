import selectors from './selectors';
const getAllMovies = selectors.getAllMovies;

const mockedData = [
  {
    _id: '1',
    title: 'Title 1',
    categories: ['Thriller', 'Sci-Fi'],
    filters: ['2d'],
    played: 'current',
  },
  {
    _id: '2',
    title: 'Title 2',
    categories: ['Horror'],
    filters: ['3d'],
    played: 'current',
  },
  {
    _id: '3',
    title: 'Title 3',
    categories: ['Comedy'],
    filters: ['for kids'],
    played: 'current',
  },
  {
    _id: '4',
    title: 'Title 4',
    categories: ['Drama', 'Sci-Fi'],
    played: 'soon',
  },
  {
    _id: '5',
    title: 'Title 5',
    categories: ['Comedy'],
    played: 'soon',
  },
];

const initialFilters = {
  filter: 'all',
  searchText: '',
  playTime: 'all',
  sort: 'asc',
  genres: [],
  page: 1,
}


const mockedInitialState = {
  movies: {
    data: mockedData,
    filtersFor: {
      all: initialFilters,
      current: 'all',
    }
  }
}

const setFilters = (filtersToSet) => {
  const filters = {
    ...initialFilters,
    ...filtersToSet,
  };

  return ({
    ...mockedInitialState,
    movies: {
      ...mockedInitialState.movies,
      filtersFor: {
        ...mockedInitialState.filtersFor,
        all: filters,
      },
    },
  });
};

const checkDataById = (filters, expectedIds) => {
  const state = setFilters(filters);
  const movies = getAllMovies(state);
  expect(movies.length).toBe(expectedIds.length);
  movies.forEach((movie, i) => {
    expect(movie._id === expectedIds[i]).toBe(true);
  });
}

describe('getAllMovies selector', () => {
  it('returns all movies on initial state sorted by alphabet in ascending order', () => {
    checkDataById(initialFilters, ['1', '2', '3', '4', '5']);
  });

  it('return movies according to searchText filter', () => {
    checkDataById({ searchText: 'title' }, ['1', '2', '3', '4', '5']);
    checkDataById({ searchText: '2' }, ['2']);
    checkDataById({ searchText: '3' }, ['3']);
    checkDataById({ searchText: '4' }, ['4']);
    checkDataById({ searchText: '5' }, ['5']);
  });

  it('returns movies according to playTime filter', () => {
    checkDataById({ playTime: 'all' }, ['1', '2', '3', '4', '5']);
    checkDataById({ playTime: 'current' }, ['1', '2', '3']);
    checkDataById({ playTime: 'soon' }, ['4', '5']);
  });

  it('returns movies according to tech filter', () => {
    checkDataById({ filter: 'all' }, ['1', '2', '3', '4', '5']);
    checkDataById({ filter: '2d' }, ['1']);
    checkDataById({ filter: '3d' }, ['2']);
    checkDataById({ filter: 'for kids' }, ['3']);
  });

  it('returns movies according to genres', () => {
    checkDataById({ genres: [] }, ['1', '2', '3', '4', '5']);
    checkDataById({ genres: ['Thriller'] }, ['1']);
    checkDataById({ genres: ['Sci-Fi'] }, ['1', '4']);
    checkDataById({ genres: ['Comedy'] }, ['3', '5']);
    checkDataById({ genres: ['Horror'] }, ['2']);
    checkDataById({ genres: ['Drama'] }, ['4']);
    checkDataById({ genres: ['Drama', 'Horror', 'Sci-Fi'] }, ['1', '2', '4']);
    checkDataById({ genres: ['Comedy', 'Horror'] }, ['2', '3', '5']);
  });

  it('sorts movies in proper way', () => {
    checkDataById({ sort: 'asc' }, ['1', '2', '3', '4', '5']);
    checkDataById({ sort: 'desc' }, ['5', '4', '3', '2', '1']);
  });

  it('returns proper movies according to mixed filters setting', () => {
    checkDataById({ playTime: 'soon', searchText: 'title', sort: 'desc' }, ['5', '4']);
    checkDataById({ playTime: 'soon', genres: ['Comedy'], searchText: 'title' }, ['5']);
    checkDataById({ filter: '3d', genres: ['Sci-Fi']}, []);
    checkDataById({ playTime: 'current', sort: 'desc'}, ['3', '2', '1']);
  });
});