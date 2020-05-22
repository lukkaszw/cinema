import { connect } from 'react-redux';
import Navigation from './Navigation';

import { getIsAuthenticated } from '../../../redux/reducers/authRedux/authRedux';

const mapStateToProps = (state) => ({
  isAuth: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);