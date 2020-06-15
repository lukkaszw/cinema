import { connect } from 'react-redux';
import DeleteAccount from './DeleteAccount';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  isDeleting: SELECTORS.forms.getIsSending(state),
  isError: SELECTORS.forms.getIsError(state),
  isSuccess: SELECTORS.forms.getIsSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteAccount: (token) => dispatch(API.user.deleteAccount(token)),
  onResetForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
  onLogout: () => dispatch(ACTION_CREATORS.auth.logout()),
});


export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);