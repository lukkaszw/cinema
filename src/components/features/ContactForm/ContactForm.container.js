import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import { sendData, resetAll } from '../../../redux/reducers/formsRedux/formsRedux';
import api from '../../../config/api';

const URL = `${api.url}/${api.endpoints.messages}`;

const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => dispatch(sendData(URL, data)),
  resetForm: () => dispatch(resetAll()),
});

export default connect(null, mapDispatchToProps)(ContactForm);
