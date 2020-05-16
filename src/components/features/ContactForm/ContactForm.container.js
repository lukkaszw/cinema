import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import { getValidation, sendData } from '../../../redux/reducers/formsRedux/formsRedux';
import api from '../../../config/api';

const URL = `${api.url}/${api.endpoints.messages}`;

const mapStateToProps = (state) => ({
  emailErrorMsg: getValidation(state).filter(field => field.name === 'email').map(field => field.error)[0],
  messageErrorMsg: getValidation(state).filter(field => field.name === 'message').map(field => field.error)[0],
});

const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => dispatch(sendData(URL, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
