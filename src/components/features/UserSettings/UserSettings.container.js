import { connect } from 'react-redux';
import UserSettings from './UserSettings';

import { getToken } from '../../../redux/reducers/authRedux/authRedux';
import { getUserData, updateUserData } from '../../../redux/reducers/userRedux/userRedux';
import { resetAll, getIsSending } from '../../../redux/reducers/formsRedux/formsRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
  data: getUserData(state),
  isSending: getIsSending(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (token, data) => dispatch(updateUserData(token, data)),
  resetUpdateForm: () => dispatch(resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);