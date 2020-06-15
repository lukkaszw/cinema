import { connect } from 'react-redux';
import MovieSchedule from './MovieSchedule';

import SELECTORS from '../../../redux/selectors';

const mapStateToProps = (state) => ({
  isAuth: SELECTORS.auth.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(MovieSchedule);