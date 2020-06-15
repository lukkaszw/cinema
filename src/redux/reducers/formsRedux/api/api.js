import axios from 'axios';

import actionCreators from '../actionCreators/actionCreators';

const sendData = (url, data, destination) => {
  
  return dispatch => {
    dispatch(actionCreators.startSending(destination));
    return axios.post(url, data)
      .then(res => {
        if(res.data.isError) {
          dispatch(actionCreators.setError(res.data.message))
        } else {
          dispatch(actionCreators.setSuccess(res.data.message));
        }
      })
      .catch(() => {
        dispatch(actionCreators.setError('Internal server error. Try again later.'))
      });
  }
}

export default {
  sendData,
};