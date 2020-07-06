import actions from './actions/actions';

const showReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_FETCHING: {
      return {
        ...statePart,
        loadingData: {
          isActive: true,
          isError: false,
        },
      };
    }
    case actions.SET_FETCH_DATA: {
      return {
        ...statePart,
        data: action.payload,
        loadingData: {
          isActive: false,
          isError: false,
        },
      };
    }
    case actions.SET_FETCH_ERROR: {
      return {
        ...statePart,
        loadingData: {
          isActive: false,
          isError: true,
        },
      };
    }
    case actions.RESET_DATA: {
      return {
        data: {},
        loadingData: {
          isActive: false,
          isError: false,
        }
      }
    }
    default: 
    return statePart;
  }
};

export default showReducer;