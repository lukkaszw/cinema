const getIsLoading = ({ user }) => user.loading.isActive;
const getIsError = ({ user }) => user.loading.isError;
const getUserData = ({ user }) => user.data;
const getNews = ({ user }) => user.data.news || [];

export default {
  getIsLoading,
  getIsError,
  getUserData,
  getNews,
};