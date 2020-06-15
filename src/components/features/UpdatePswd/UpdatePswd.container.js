import { connect } from 'react-redux';
import UpdatePswd from './UpdatePswd';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  isSending: SELECTORS.forms.getIsSending(state),
});

const mapDispatchToProps = (dispatch) => ({
  updatePswd: (token, pswdData) => dispatch(API.user.updateUserPswd(token, pswdData)),
  resetUpdatePswdForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePswd);