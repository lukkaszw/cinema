import axios from 'axios';

/* selectors */
export const getIsSending = ({ formsState }) => formsState.sending.isActive;
export const getIsError = ({ formsState }) => formsState.sending.isError;
export const getIsSuccess = ({ formsState }) => formsState.sending.isSuccess;
export const getMessage = ({ formsState }) => formsState.message;
export const getDestination = ({ formsState }) => formsState.destination;

/* action name creators */
const reducerName = 'forms';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_SENDING = createActionName('START_SENDING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_SUCCESS = createActionName('SET_SUCCESS');
export const RESET_ALL = createActionName('RESET_ALL');

/* action creators */
export const startSending = (payload) => ({ payload, type: START_SENDING });
export const setError = (payload) => ({ payload, type: SET_ERROR });
export const setSuccess = (payload) => ({ payload, type: SET_SUCCESS });
export const resetAll = () => ({ type: RESET_ALL })

/* thunk actions creators */
export const sendData = (url, data, destination) => {
  
  return dispatch => {
    dispatch(startSending(destination));
    return axios.post(url, data)
      .then(res => {
        if(res.data.isError) {
          dispatch(setError(res.data.message))
        } else {
          dispatch(setSuccess(res.data.message));
        }
      })
      .catch(() => {
        dispatch(setError('Internal server error. Try again later.'))
      });
  }
}

const formsReducer = (statePart = {}, action = {}) => {
    switch(action.type) {
      case START_SENDING: {
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
      case SET_SUCCESS: {
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
      case SET_ERROR: {
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
      case RESET_ALL: {
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