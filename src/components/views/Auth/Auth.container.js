import { connect } from 'react-redux';
import Auth from './Auth';
import {
  getIsAuthenticated
} from '../../../redux/reducers/authRedux/authRedux';
import {
  resetAll
} from '../../../redux/reducers/formsRedux/formsRedux';


const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFormState: () => dispatch(resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);