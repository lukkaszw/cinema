import { connect } from 'react-redux';
import App from './App';

import {
  getIsAuthenticated,
  checkStartAuthStatus
} from './redux/reducers/authRedux/authRedux';

const mapStateToProps = (state) => ({
  isAuth: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckStartAuth: () => dispatch(checkStartAuthStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);