import actions from './actions/actions';

const moviePageReducer = (statePart = {}, action = {}) => {
    switch(action.type) {
      case actions.START_FETCHING: {
        return {
          data: {},
          loading: {
            isActive: true,
            isError: false,
          }
        }
      }
      case actions.SET_FETCH_ERROR: {
        return {
          ...statePart,
          loading: {
            isActive: false,
            isError: true,
          }
        }
      }
      case actions.SET_FETCH_DATA: {
        return {
          data: action.payload,
          loading: {
            isActive: false,
            isError: false,
          }
        }
      }
      default: 
        return statePart;
    }
};

export default moviePageReducer;