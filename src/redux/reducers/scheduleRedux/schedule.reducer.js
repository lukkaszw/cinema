import actions from './actions/actions';

const scheduleReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isError: false,
          isActive: true,
        }
      }
    }
    case actions.SET_ERROR: {
      return {
        ...statePart,
        loading: {
          isError: true,
          isActive: false,
        }
      }
    }
    case actions.SET_DATA: {
      return {
        ...statePart,
        data: action.payload,
        loading: {
          isError: false,
          isActive: false,
        }
      }
    }
    case actions.SET_PAGE: {
      return {
        ...statePart,
        filters: {
          ...statePart.filters,
          page: action.payload,
        }
      }
    }
    case actions.CHANGE_SEARCH_TEXT: {
      return {
        ...statePart,
        filters: {
          page: 1,
          searchText: action.payload,
        }
      }
    }
    default: 
    return statePart;
  }
};

export default scheduleReducer;