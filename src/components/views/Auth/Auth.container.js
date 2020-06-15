import { connect } from 'react-redux';
import Auth from './Auth';

import SELECTORS from '../../../redux/selectors';
import ACTION_CREATORS from '../../../redux/actionCreators';


const mapStateToProps = (state) => ({
  isAuthenticated: SELECTORS.auth.getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFormState: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);