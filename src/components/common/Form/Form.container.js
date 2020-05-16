import { connect } from 'react-redux';
import Form from './Form';
import {
  getIsSending,
  getIsError,
  getIsSuccess,
  getMessage,
  resetAll,
} from '../../../redux/reducers/formsRedux/formsRedux';

export const mapStateToProps = (state) => ({
  isSending: getIsSending(state),
  isError: getIsError(state),
  isSuccess: getIsSuccess(state),
  message: getMessage(state),
});

export const mapDispatchToProps = (dispatch) => ({
  resetMessage: () => dispatch(resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);