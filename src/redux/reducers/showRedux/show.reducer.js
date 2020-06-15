import actions from './actions/actions';

const showReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_FETCHING_DATA: {
      return {
        ...statePart,
        loadingData: {
          isActive: true,
          isError: false,
        },
      };
    }
    case actions.SET_DATA: {
      return {
        ...statePart,
        data: action.payload,
        loadingData: {
          isActive: false,
          isError: false,
        },
      };
    }
    case actions.SET_ERROR: {
      return {
        ...statePart,
        loadingData: {
          isActive: false,
          isError: true,
        },
      };
    }
    default: 
    return statePart;
  }
};

export default showReducer;