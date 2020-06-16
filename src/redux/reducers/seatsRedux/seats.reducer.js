import actions from './actions/actions';

const seatsReducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case actions.START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isActive: true,
          isError: false,
        },
      };
    }
    case actions.SET_FETCH_DATA: {
      return {
        data: action.payload,
        loading: {
          isActive: false,
          isError: false,
        },
      };
    }
    case actions.SET_FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          isActive: false,
          isError: true,
        },
      };
    }
    default: 
    return statePart;
  }
};

export default seatsReducer;