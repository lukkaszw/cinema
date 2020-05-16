const api = {
  url: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
  endpoints: {
    movies: 'movies',
    schedule: 'schedule',
    searchMovie: 'movies/search',
    messages: 'messages',
  }
};

export default api;