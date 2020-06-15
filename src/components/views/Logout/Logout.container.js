import { connect } from 'react-redux';
import Logout from './Logout';

import SELECTORS from '../../../redux/selectors';
import API from '../../../redux/api';

const mapStateToProps = (state) => ({
  token: SELECTORS.auth.getToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: (token) => dispatch(API.auth.logoutUser(token)),
});

export default connect(mapStateToProps ,mapDispatchToProps)(Logout);