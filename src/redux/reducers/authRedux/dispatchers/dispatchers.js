import actionCreators from '../actionCreators/actionCreators';

const login = actionCreators.login;

const checkStartAuthStatus = () => {
  return dispatch => {

    const token = localStorage.getItem('tkn');
    if(token) {
      dispatch(login(token));
    }
    return;
  }
}

export default {
  checkStartAuthStatus,
};