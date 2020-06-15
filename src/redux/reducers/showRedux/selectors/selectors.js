const getIsFetching = ({ show }) => show.loadingData.isActive;
const getIsError = ({ show }) => show.loadingData.isError;
const getData = ({ show }) => show.data;

export default {
  getIsFetching,
  getIsError,
  getData,
};