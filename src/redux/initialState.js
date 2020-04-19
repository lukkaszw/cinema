const initialState = {
  movies: {
    data: [],
    loading: {
      isActive: false,
      isError: false,
    },
  },
  futureMovies: {
    data: [],
    loading: {
      isActive: false,
      isError: false,
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
};

export default initialState;