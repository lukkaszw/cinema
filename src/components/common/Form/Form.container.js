import { connect } from 'react-redux';
import Form from './Form';

import SELECTORS from '../../../redux/selectors';
import ACTION_CREATORS from '../../../redux/actionCreators';

export const mapStateToProps = (state) => ({
  isSending: SELECTORS.forms.getIsSending(state),
  isError: SELECTORS.forms.getIsError(state),
  isSuccess: SELECTORS.forms.getIsSuccess(state),
  message: SELECTORS.forms.getMessage(state),
});

export const mapDispatchToProps = (dispatch) => ({
  resetForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);