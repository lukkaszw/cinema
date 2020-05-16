import axios from 'axios';

/* selectors */
export const getIsSending = ({ formsState }) => formsState.sending.isActive;
export const getIsError = ({ formsState }) => formsState.sending.isError;
export const getIsSuccess = ({ formsState }) => formsState.sending.isSuccess;
export const getMessage = ({ formsState }) => formsState.message;
export const getValidation = ({ formsState }) => formsState.validation;

/* action name creators */
const reducerName = 'movie-page';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const START_SENDING = createActionName('START_SENDING');
export const SET_ERROR = createActionName('SET_ERROR');
export const SET_SUCCESS = createActionName('SET_SUCCESS');
export const RESET_ALL = createActionName('RESET_ALL');

/* action creators */
export const startSending = () => ({ type: START_SENDING });
export const setError = (payload) => ({ payload, type: SET_ERROR });
export const setSuccess = (payload) => ({ payload, type: SET_SUCCESS });
export const resetAll = () => ({ type: RESET_ALL })

/* thunk actions creators */
export const sendData = (url, data) => {
  
  return dispatch => {
    dispatch(startSending());
    return axios.post(url, data)
      .then(res => {
        if(res.data.isError) {
          dispatch(setError({ error: res.data.message, validation: res.data.validation || [] }))
        } else {
          dispatch(setSuccess(res.data.message));
        }
      })
      .catch(() => {
        dispatch(setError({ error: 'Internal server error. Try again later.' }))
      });
  }
}

const formsReducer = (statePart = {}, action = {}) => {
    switch(action.type) {
      case START_SENDING: {
        return {
          sending: {
            isActive: true,
            isError: false,
            isSuccess: false,
          },
          message: '',
          validation: [],
        };
      }
      case SET_SUCCESS: {
        return {
          sending: {
            isActive: false,
            isError: false,
            isSuccess: true,
          },
          message: action.payload,
          validation: [],
        }
      }
      case SET_ERROR: {
        return {
          sending: {
            isActive: false,
            isError: true,
            isSuccess: false,
          },
          message: action.payload.error,
          validation: action.payload.validation,
        }
      }
      case RESET_ALL: {
        return {
          sending: {
            isActive: false,
            isError: false,
            isSuccess: false,
          },
          message: '',
          validation: [],
        };
      }
      default: 
        return statePart;
    }
};

export default formsReducer;