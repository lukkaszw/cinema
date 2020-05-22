import { connect } from 'react-redux';
import SignUser from './SignUser';

import {
  sendCredentials,
} from '../../../redux/reducers/authRedux/authRedux';

import { getIsSending, getDestination, getMessage, getIsError, resetAll, getIsSuccess } from '../../../redux/reducers/formsRedux/formsRedux';

const mapStateToProps = (state) => {
  const isRegister = (getDestination(state) === 'register');
  return {
    isSending: isRegister && getIsSending(state),
    isError: isRegister && getIsError(state),
    isSuccess: isRegister && getIsSuccess(state),
    message: isRegister ? getMessage(state) : '',
  };
}

const mapDispatchToProps = (dispatch) => ({
  sendCredentials: (credentials) => dispatch(sendCredentials(credentials, 'register')),
  resetForm: () => dispatch(resetAll()),
});

const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUser);

export default SignUp;