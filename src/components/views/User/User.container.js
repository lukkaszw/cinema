import { connect } from 'react-redux';
import User from './User';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
  isFetching: SELECTORS.user.getIsLoading(state),
  isError: SELECTORS.user.getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (token) => dispatch(API.user.fetchUserData(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);