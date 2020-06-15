import actions from './actions/actions';

const userReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case actions.START_FETCHING: {
      return {
        ...statePart,
        loading: {
          isActive: true,
          isError: false,
        },
      };
    }
    case actions.SET_DATA: {
      return {
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
        loading: {
          isActive: false,
          isError: true,
        },
      };
    }
    case actions.SET_NEWS_AS_READ: {
      return {
        ...statePart,
        data: {
          ...statePart.data,
          news: statePart.data.news.map(oneNews => {
            if(oneNews._id === action.payload) {
              oneNews.isRead = true;
            }
            return oneNews;
          }),
        },
      };
    }
    default: 
      return statePart;
  }
};

export default userReducer;