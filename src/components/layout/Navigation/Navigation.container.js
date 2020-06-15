import { connect } from 'react-redux';
import Navigation from './Navigation';

import SELECTORS from '../../../redux/selectors';

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.auth.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);