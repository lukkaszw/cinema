import actions from '../actions/actions';

const login = (payload) => ({ payload, type: actions.LOGIN });
const logout = () => ({ type: actions.LOGOUT });

export default {
  login,
  logout,
};