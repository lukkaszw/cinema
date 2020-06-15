import { connect } from 'react-redux';
import SignUser from './SignUser';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => {
  const isRegister = (SELECTORS.forms.getDestination(state) === 'register');
  return {
    isSending: isRegister && SELECTORS.forms.getIsSending(state),
    isError: isRegister && SELECTORS.forms.getIsError(state),
    isSuccess: isRegister && SELECTORS.forms.getIsSuccess(state),
    message: isRegister ? SELECTORS.forms.getMessage(state) : '',
  };
}

const mapDispatchToProps = (dispatch) => ({
  sendCredentials: (credentials) => dispatch(API.auth.sendCredentials(credentials, 'register')),
  resetForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUser);

export default SignUp;