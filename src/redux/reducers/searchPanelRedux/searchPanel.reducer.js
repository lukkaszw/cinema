import actions from './actions/actions';
 
const searchPanelReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_SEARCHING: {
      return {
        data: [],
        query: action.payload,
        loading: {
          isActive: true,
          isError: false,
        },
      };
    }
    case actions.SET_FOUND_DATA: {
      return {
        ...statePart,
        data: action.payload,
        loading: {
          isActive: false,
          isError: false,
        },
      };
    }
    case actions.SET_ERROR: {
      return {
        ...statePart,
        data: [],
        loading: {
          isActive: false,
          isError: true,
        },
      };
    }
    case actions.RESET_QUERY: {
      return {
        data: [],
        query: '',
        loading: {
          isActive: false,
          isError: false,
        }
      }
    }
    default:  
      return statePart;
  }
}

export default searchPanelReducer;














