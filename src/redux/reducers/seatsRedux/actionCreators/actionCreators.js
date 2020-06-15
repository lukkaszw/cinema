import actions from '../actions/actions';

const startFetching = () => ({ type: actions.START_FETCHING_SEATS });
const setError = () => ({ type: actions.SET_ERROR });
const updateSeats = (payload) => ({ payload, type: actions.SET_DATA });

export default {
  startFetching,
  setError,
  updateSeats,
};