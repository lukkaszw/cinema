const api = {
  news: {
    url: process.env.NODE_ENV === 'production' ? '/news' : 'http://localhost:8000/news',
  },
  user: {
    url: process.env.NODE_ENV === 'production' ? '/user' : 'http://localhost:8000/user',
    endpoints: {
      data: 'data',
      news: 'news',
      pswd: 'p',
    },
  },
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