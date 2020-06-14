import { connect } from 'react-redux';
import DeleteAccount from './DeleteAccount';

import { getToken, logout } from '../../../redux/reducers/authRedux/authRedux';
import { deleteAccount } from '../../../redux/reducers/userRedux/userRedux';
import {
  getIsSending,
  getIsError,
  getIsSuccess,
  resetAll
} from '../../../redux/reducers/formsRedux/formsRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
  isDeleting: getIsSending(state),
  isError: getIsError(state),
  isSuccess: getIsSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteAccount: (token) => dispatch(deleteAccount(token)),
  onResetForm: () => dispatch(resetAll()),
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);