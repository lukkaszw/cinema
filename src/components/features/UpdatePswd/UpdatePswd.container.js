import { connect } from 'react-redux';
import UpdatePswd from './UpdatePswd';

import {
  getToken,
} from '../../../redux/reducers/authRedux/authRedux';

import {
  updateUserPswd
} from '../../../redux/reducers/userRedux/userRedux';

import {
  getIsSending,
  resetAll,
} from '../../../redux/reducers/formsRedux/formsRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
  isSending: getIsSending(state),
});

const mapDispatchToProps = (dispatch) => ({
  updatePswd: (token, pswdData) => dispatch(updateUserPswd(token, pswdData)),
  resetUpdatePswdForm: () => dispatch(resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePswd);