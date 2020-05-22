import React, { Component } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import PropTypes from 'prop-types';
import constants from './constants';
import _v from 'validator';

class SignUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      login: '',
      errors: {
        login: false,
        password: false,
      }
    }

    if(props.isForRegister) {
      this.state.confirmPassword = '';
      this.state.errors.confirmPassword = false;
      this.handleConfirmPassword = (e) => this.handleChangeFieldValue(e.target.value, 'confirmPassword');
    }

    const formType = props.isForRegister ? 'register' : 'login';

    this.setConstants(formType);
  }

  setConstants = (formType) => {
    this.constants = constants[formType];
  }

  validate = {
    login: (value) => !_v.isEmail(value),
    password: (value) => !(value.length > 8),
    confirmPassword: (value) => value !== this.state.password,
  }

  handleChangeFieldValue = (value, fieldName) => {
    const type = this.constants.TYPE;
    const validate = this.validate;
    console.log(type, validate[fieldName](value));
    this.setState(prevState => ({
      [fieldName]: value,
      errors: {
        ...prevState.errors,
        [fieldName]: type === 'register' ? validate[fieldName](value) : false,
      }
    }));
  }

  handleChangeLogin = (e) => this.handleChangeFieldValue(e.target.value, 'login');

  handleChangePassword = (e) => this.handleChangeFieldValue(e.target.value, 'password');

  checkIsError = () => {
    let isError = false;
    const fieldsToCheck = this.state.errors;
    Object.keys(fieldsToCheck).forEach(field => {
      if(this.state.errors[field]) {
        isError = true;
        return;
      }
    });

    if(!isError) {
      const { login, password } = this.state;
      if(login.length === 0 || password.length === 0) {
        isError = true;
      } 
    }

    if(!isError && this.constants.TYPE === 'register') {
      isError = this.state.confirmPassword.length === 0;
    }

    return isError;
  }

  getCredentials = () => {
    const { login, password } = this.state;
    const credentials = { login, password };
    if(this.constants.TYPE === 'register') {
      credentials.confirmPassword = this.state.confirmPassword;
    }
    return credentials;
  }

  resetFormFields = () => {
    this.setState({
      login: '',
      password: '',
      confirmPassword: '',
      errors: {
        login: false,
        password: false,
        confirmPassword: false,
      },
    });
  }

  handleSubmitForm = () => {
    if(this.checkIsError()) return;

    const credentials = this.getCredentials();

    this.props.sendCredentials(credentials);
  }

  handleResetForm = () => {
    if(this.props.isSuccess) {
      this.resetFormFields();
      this.props.goToOtherPanel();    
    }
    this.props.resetForm();
  }


  render() { 
    const { login, password, confirmPassword, errors } = this.state;
    const { handleChangeLogin, handleChangePassword, handleSubmitForm, handleConfirmPassword, handleResetForm } = this;
    const { goToOtherPanel, isSending, isError, isSuccess, message } = this.props;
    const {
      TYPE,
      FORM_TITLE,
      BUTTON_TITLE,
      QUERY,
      BTN_QUERY,
    } = this.constants;

    return ( 
      <AuthForm 
        errors={errors}
        isSending={isSending}
        isSendingError={isError}
        isSendingSuccess={isSuccess}
        requestResponse={message}
        type={TYPE}
        login={login}
        password={password}
        confirmedPassword={confirmPassword}
        onChangeLogin={handleChangeLogin}
        onChangePassword={handleChangePassword}
        onChangeConfirmPassword={handleConfirmPassword}
        onSubmit={handleSubmitForm}
        title={FORM_TITLE}
        btnTitle={BUTTON_TITLE}
        query={QUERY}
        queryBtn={BTN_QUERY}
        queryAction={goToOtherPanel}
        resetForm={handleResetForm}
      />
     );
  }
}

SignUser.propTypes = {
  goToOtherPanel: PropTypes.func.isRequired,
  sendCredentials: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  resetForm: PropTypes.func.isRequired,
}
 
export default SignUser;