import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING_DATA });
const setData = (payload) => ({ payload, type: actions.SET_DATA });
const setError = () => ({ type: actions.SET_ERROR });

export default {
  startFetching,
  setData,
  setError,
};
