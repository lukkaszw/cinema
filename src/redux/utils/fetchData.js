import axios from 'axios';

const fetchData = (actionCreators, fetchData, startPayload) => {
  return dispatch => {
    if(startPayload) {
      dispatch(actionCreators.startFetching(startPayload));
    } else {
      dispatch(actionCreators.startFetching());
    }
    return axios.get(fetchData.url, fetchData.config)
      .then(res => dispatch(actionCreators.setFetchData(res.data)))
      .catch(() => dispatch(actionCreators.setFetchError()));
  }
}

export default fetchData;