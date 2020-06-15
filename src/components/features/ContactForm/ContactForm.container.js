import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import api from '../../../config/api';

import ACTION_CREATORS from '../../../redux/actionCreators';
import API from '../../../redux/api';


const URL = `${api.url}/${api.endpoints.messages}`;

const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => dispatch(API.forms.sendData(URL, data)),
  resetForm: () => dispatch(ACTION_CREATORS.forms.resetAll()),
});

export default connect(null, mapDispatchToProps)(ContactForm);
