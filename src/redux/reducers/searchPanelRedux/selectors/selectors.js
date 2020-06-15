const getSearchedMovies = ({ searchPanel }) => searchPanel.data;
const getIsLoading = ({ searchPanel }) => searchPanel.loading.isActive;
const getIsError = ({ searchPanel }) => searchPanel.loading.isError;
const getQuery = ({ searchPanel }) => searchPanel.query;

export default {
  getSearchedMovies,
  getIsLoading,
  getIsError,
  getQuery,
};