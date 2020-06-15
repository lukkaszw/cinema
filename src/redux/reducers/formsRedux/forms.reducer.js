import actions from './actions/actions';

const formsReducer = (statePart = {}, action = {}) => {
    switch(action.type) {
      case actions.START_SENDING: {
        return {
          destination: action.payload,
          sending: {
            isActive: true,
            isError: false,
            isSuccess: false,
          },
          message: '',
        };
      }
      case actions.SET_SUCCESS: {
        return {
          ...statePart,
          sending: {
            isActive: false,
            isError: false,
            isSuccess: true,
          },
          message: action.payload,
        }
      }
      case actions.SET_ERROR: {
        return {
          ...statePart,
          sending: {
            isActive: false,
            isError: true,
            isSuccess: false,
          },
          message: action.payload,
        }
      }
      case actions.RESET_ALL: {
        return {
          destination: null,
          sending: {
            isActive: false,
            isError: false,
            isSuccess: false,
          },
          message: '',
        };
      }
      default: 
        return statePart;
    }
};

export default formsReducer;