const getIsAuthenticated = ({ auth }) => !!auth.token;
const getToken = ({ auth }) => auth.token;

export default {
  getIsAuthenticated,
  getToken,
};