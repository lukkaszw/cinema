import { connect } from 'react-redux';
import OrderPanel from './OrderPanel';

import SELECTORS from '../../../redux/selectors';
import ACTION_CREATORS from '../../../redux/actionCreators';

const mapStateToProps = (state) => ({
  isFetchingSeats: SELECTORS.seats.getIsSeatsFetching(state),
  isFetchingError: SELECTORS.seats.getIsSeatsError(state), 
  isSendingOrder: SELECTORS.forms.getIsSending(state),
  isOrderSuccess: SELECTORS.forms.getIsSuccess(state),
  isOrderError: SELECTORS.forms.getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFormState: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPanel);