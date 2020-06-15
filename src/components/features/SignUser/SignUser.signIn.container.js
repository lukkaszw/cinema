import { connect } from 'react-redux';
import SignUser from './SignUser';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators/index';

const mapStateToProps = (state) => {
  const isLogin = (SELECTORS.forms.getDestination(state) === 'login');
  return {
    isSending: isLogin && SELECTORS.forms.getIsSending(state),
    isError: isLogin && SELECTORS.forms.getIsError(state),
    message: isLogin ? SELECTORS.forms.getMessage(state) : '',
  };
}

const mapDispatchToProps = (dispatch) => ({
  sendCredentials: (credentials) => dispatch(API.auth.sendCredentials(credentials, 'login')),
  resetForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignUser);

export default SignIn;