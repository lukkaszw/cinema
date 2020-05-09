const api = {
  url: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
  endpoints: {
    movies: 'movies',
    current: 'movies/current',
    futureMovies: 'movies/soon',
    schedule: 'schedule',
  }
};

export default api;