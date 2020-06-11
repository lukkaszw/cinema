import { connect } from 'react-redux';
import MovieSchedule from './MovieSchedule';

import { getIsAuthenticated } from '../../../redux/reducers/authRedux/authRedux';

const mapStateToProps = (state) => ({
  isAuth: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(MovieSchedule);