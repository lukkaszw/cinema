import { connect } from 'react-redux';
import SignUser from './SignUser';

import {
  sendCredentials,
} from '../../../redux/reducers/authRedux/authRedux';

import { getIsSending, getDestination, getMessage, getIsError, resetAll } from '../../../redux/reducers/formsRedux/formsRedux';

const mapStateToProps = (state) => {
  const isLogin = (getDestination(state) === 'login');
  return {
    isSending: isLogin && getIsSending(state),
    isError: isLogin && getIsError(state),
    message: isLogin ? getMessage(state) : '',
  };
}

const mapDispatchToProps = (dispatch) => ({
  sendCredentials: (credentials) => dispatch(sendCredentials(credentials, 'login')),
  resetForm: () => dispatch(resetAll()),
});

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignUser);

export default SignIn;