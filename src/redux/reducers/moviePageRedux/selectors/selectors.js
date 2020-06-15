const getData = ({ moviePage }) => moviePage.data;
const getIsLoading = ({ moviePage }) => moviePage.loading.isActive;
const getIsError = ({ moviePage }) => moviePage.loading.isError;

export default {
  getData,
  getIsLoading,
  getIsError,
};