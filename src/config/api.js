const api = {
  url: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
  endpoints: {
    movies: 'movies',
    futureMovies: 'movies/soon',
  }
};

export default api;