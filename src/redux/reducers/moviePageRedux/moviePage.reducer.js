import actions from './actions/actions';

const moviePageReducer = (statePart = {}, action = {}) => {
    switch(action.type) {
      case actions.START_LOADING: {
        return {
          data: {},
          loading: {
            isActive: true,
            isError: false,
          }
        }
      }
      case actions.SET_ERROR: {
        return {
          ...statePart,
          loading: {
            isActive: false,
            isError: true,
          }
        }
      }
      case actions.SET_DATA: {
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