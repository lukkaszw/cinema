import { connect } from 'react-redux';
import Logout from './Logout';
import {
  getToken,
  logoutUser
} from '../../../redux/reducers/authRedux/authRedux';

const mapStateToProps = (state) => ({
  token: getToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: (token) => dispatch(logoutUser(token)),
});

export default connect(mapStateToProps ,mapDispatchToProps)(Logout);