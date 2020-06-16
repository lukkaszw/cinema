import axios from 'axios';

import actionCreators from '../actionCreators/actionCreators';

const sendData = (url, data, destination) => {
  
  return dispatch => {
    dispatch(actionCreators.startSending(destination));
    return axios.post(url, data)
      .then(res => {
        if(res.data.isError) {
          dispatch(actionCreators.setSendError(res.data.message))
        } else {
          dispatch(actionCreators.setSendSuccess(res.data.message));
        }
      })
      .catch(() => {
        dispatch(actionCreators.setSendError('Internal server error. Try again later.'))
      });
  }
}

export default {
  sendData,
};