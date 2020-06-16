import actions from './actions/actions';

const moviesReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isError: false,
          isActive: true,
        },
      };
    }
    case actions.SET_FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          isError: true,
          isActive: false,
        },
      };
    }
    case actions.SET_FETCH_DATA: {
    
      return {
        ...statePart,
        data: action.payload,
        loading: {
          isError: false,
          isActive: false,
        },
      };
    }
    case actions.SET_ALL_FILTER: {
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
    case actions.SET_CURRENT_FILTER: {
      return {
        ...statePart,
        filtersFor: {
          ...statePart.filtersFor,
          current: action.payload,
        },
      };
    }
    case actions.SET_SEARCH_TEXT: {
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
    case actions.SET_PAGE: {
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
    case actions.SET_PLAY_TIME: {
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
    case actions.SET_SORT: {
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
    case actions.TOGGLE_GENRE: {
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
    case actions.RESET_FILTERS: {
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