const initialState = {
  movies: {
    data: [],
    filters: {
      all: 'all',
      current: 'all',
    },
    loading: {
      isActive: false,
      isError: false,
    },
  },
  schedule: {
    data: [],
    loading: {
      isActive: false,
      isError: false,
    },
    filters: {
      page: 1,
      searchText: '',
    }
  },
  tickets: {
    movieId: null,
    data: [],
    loading: {
      isActive: false,
      isError: false,
    },
  },
  moviePage: {
    data: {},
    loading: {
      isActive: false,
      isError: false,
    }
  }
};

export default initialState;