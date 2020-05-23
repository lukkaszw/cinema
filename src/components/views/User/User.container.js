import { connect } from 'react-redux';
import User from './User';

import {
  getToken,
} from '../../../redux/reducers/authRedux/authRedux';

import { fetchUserData, getUserData, getIsLoading, getIsError } from '../../../redux/reducers/userRedux/userRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
  data: getUserData(state),
  isFetching: getIsLoading(state),
  isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (token) => dispatch(fetchUserData(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);