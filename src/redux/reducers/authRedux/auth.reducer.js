import actions from './actions/actions';

const authReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case actions.LOGIN: {
      return {
        token: action.payload,
      };
    }
    case actions.LOGOUT: {
      return {
        token: null,
      };
    }
    default: 
      return statePart;
  }
};

export default authReducer;