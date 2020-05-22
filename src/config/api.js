const api = {
  auth: {
    url: process.env.NODE_ENV === 'production' ? '/auth' : 'http://localhost:8000/auth',
    endpoints: {
      login: 'login',
      logout: 'logout',
      logoutAll: 'logoutAll',
      register: 'register',
    },
  },
  url: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
  endpoints: {
    movies: 'movies',
    schedule: 'schedule',
    searchMovie: 'movies/search',
    messages: 'messages',
  }
};

export default api;