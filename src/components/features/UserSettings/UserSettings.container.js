import { connect } from 'react-redux';
import UserSettings from './UserSettings';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  data: SELECTORS.user.getUserData(state),
  isSending: SELECTORS.forms.getIsSending(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (token, data) => dispatch(API.user.updateUserData(token, data)),
  resetUpdateForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);