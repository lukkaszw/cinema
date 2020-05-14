import axios from 'axios';
import api from '../../../config/api';
import sortByAlphabet from '../../../utils/sortByAlphabet/sortByAlphabet';

/* selectors */
export const getAllMovies = ({ movies }) => {
  const { filter, searchText, playTime, sort, genres } = movies.filtersFor.all;

  let filteredMovies = movies.data;

  if(genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie => movie.categories.some(element => genres.includes(element)));
  }

  if(playTime !== 'all') {
    filteredMovies = filteredMovies.filter(movie => movie.played === playTime);
  }

  if(filter !== 'all' && playTime !== 'soon') {
    filteredMovies = filteredMovies.filter(movie => {
      if(movie.filters) {
        return movie.filters.includes(filter);
      }
      return false;
    });
  }

  if(searchText) {
    filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchText));
  }

  return sortByAlphabet(filteredMovies, sort);
};
export const checkIfDataFetched = ({ movies }) => movies.data.length > 0;
export const getCurrentMovies = ({ movies }) => {
  const currentMovies = movies.data.filter(movie => movie.played === 'current');
  const crntFilter = movies.filtersFor.current;
  if(crntFilter === 'all') {
    return currentMovies;
  }
  return currentMovies.filter(movie => movie.filters.includes(crntFilter));
}
export const getSoonMovies = ({ movies }) => movies.data.filter(movie => movie.played === 'soon');
export const getIsLoading = ({ movies }) => movies.loading.isActive;
export const getAllMoviesFilter = ({ movies }) => movies.filtersFor.all.filter;
export const getCurrentMoviesFilter = ({ movies }) => movies.filtersFor.current;
export const getPlayTimeFilter = ({ movies }) => movies.filtersFor.all.playTime;
export const getIsError = ({ movies }) => movies.loading.isError;
export const getSearchText = ({ movies }) => movies.filtersFor.all.searchText;
export const getAllMoviesPage = ({ movies }) => movies.filtersFor.all.page;
export const getSortFilter = ({ movies }) => movies.filtersFor.all.sort;
export const getGenresFilter = ({ movies }) => movies.filtersFor.all.genres;

/* action name creators */
const reducerName = 'movies';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_FETCHING = createActionName('START_FETCHING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_DATA = createActionName('SET_DATA');
export const SET_ALL_FILTER = createActionName('SET_FILTER');
export const SET_CURRENT_FILTER = createActionName('SET_CURRENT_FILTER');
export const SET_SEARCH_TEXT = createActionName('SET_SEARCH_TEXT');
export const SET_PAGE = createActionName('SET_PAGE');
export const SET_PLAY_TIME = createActionName('SET_PLAY_TIME');
export const SET_SORT = createActionName('SET_SORT_BY');
export const TOGGLE_GENRE = createActionName('TOGGLE_GENRE');
export const RESET_FILTERS = createActionName('RESET_FILTERS');

/* action creators */
export const startFetching = () => ({ type: START_FETCHING });
export const fetchError = () => ({ type: SET_ERROR });
export const fetchSucceded = (payload) => ({ payload, type: SET_DATA });
export const setAllMoviesFilter = (payload) => ({payload, type: SET_ALL_FILTER });
export const setCurrentMoviesFilter = (payload) => ({ payload, type: SET_CURRENT_FILTER })
export const setSearchText = (payload) => ({ payload, type: SET_SEARCH_TEXT });
export const setPage = (payload) => ({ payload, type: SET_PAGE });
export const setTimeFilter = (payload) => ({ payload, type: SET_PLAY_TIME });
export const setSortFilter = (payload) => ({ payload, type: SET_SORT });
export const toggleGenre = (payload) => ({ payload, type: TOGGLE_GENRE });
export const resetAllMoviesFilters = () => ({ type: RESET_FILTERS });

/* thunk actions creators */
export const fetchMoviesData = () => {
  const url = `${api.url}/${api.endpoints.movies}`;
  return dispatch => {
    dispatch(startFetching());
    return axios.get(url)
      .then(res => dispatch(fetchSucceded(res.data)))
      .catch(() => dispatch(fetchError()));
  }
}

const moviesReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isError: false,
          isActive: true,
        },
      };
    }
    case SET_ERROR: {
      return {
        ...statePart,
        loading: {
          isError: true,
          isActive: false,
        },
      };
    }
    case SET_DATA: {
    
      return {
        ...statePart,
        data: action.payload,
        loading: {
          isError: false,
          isActive: false,
        },
      };
    }
    case SET_ALL_FILTER: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            filter: action.payload,
            page: 1,
          },
        },
      };
    }
    case SET_CURRENT_FILTER: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          current: action.payload,
        },
      };
    }
    case SET_SEARCH_TEXT: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            searchText:   action.payload,
            page: 1,
          },
        },
      };
    }
    case SET_PAGE: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            page: action.payload,
          },
        },
      };
    }
    case SET_PLAY_TIME: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            playTime: action.payload,
            page: 1,
          },
        },
      };
    }
    case SET_SORT: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            sort: action.payload,
          },
        },
      };
    }
    case TOGGLE_GENRE: {
      const genres = statePart.filtersFor.all.genres;
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            genres: genres.includes(action.payload) ? 
              genres.filter(genre => genre !== action.payload) : 
              genres.concat([action.payload]),
            page: 1,
          },
        },
      };
    }
    case RESET_FILTERS: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          all: {
            ...statePart.filtersFor.all,
            searchText: '',
            filter: 'all',
            playTime: 'all',
            genres: [],
            page: 1,
          }
        }
      }
    }
    default: 
    return statePart;
  }
};

export default moviesReducer;