import { connect } from 'react-redux';
import App from './App';

import SELECTORS from './redux/selectors';
import DISPATCHERS from './redux/dispatchers';

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.auth.getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckStartAuth: () => dispatch(DISPATCHERS.auth.checkStartAuthStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);