import { connect } from 'react-redux';
import OrderPanel from './OrderPanel';

import {
  getIsSeatsError,
  getIsSeatsFetching,
} from '../../../redux/reducers/seatsRedux/seatsRedux';

import { 
  getIsSending, 
  getIsSuccess, 
  getIsError as getIsOrderError, 
  resetAll } from '../../../redux/reducers/formsRedux/formsRedux';

const mapStateToProps = (state) => ({
  isFetchingSeats: getIsSeatsFetching(state),
  isFetchingError: getIsSeatsError(state), 
  isSendingOrder: getIsSending(state),
  isOrderSuccess: getIsSuccess(state),
  isOrderError: getIsOrderError(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFormState: () => dispatch(resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPanel);