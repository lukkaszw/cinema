import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import Form from '../../common/Form/Form.container';
import InputField from '../../common/InputField/InputField';
import styles from './UpdatePswd.module.scss';

class UpdatePswd extends Component {
  state = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
    errors: {
      oldPassword: false,
      password: false,
      confirmPassword: false,
    },
  };

  validate = {
    oldPassword: (value) => !(value.length > 0),
    password: (value) => !(value.length > 8),
    confirmPassword: (value) => value !== this.state.password,
  }

  componentWillUnmount() {
    this.props.resetUpdatePswdForm();
  }

  handleChangeInputValue = (e, key) => {
    const value = e.target.value;
    this.setState(prevState => ({
      [key]: value,
      errors: {
        ...prevState.errors,
        [key]: this.validate[key](value),
      }
    }));
  }

  checkErrors = () => {
    const errors = this.state.errors;
    let isError = false;
    Object.keys(errors).forEach(error => {
      if(errors[error]) {
        isError = true;
        return;
      }
    });

    if(!isError) {
      const { oldPassword, password, confirmPassword } = this.state;
      if( oldPassword.length === 0 || password.length === 0 || confirmPassword === 0) {
        isError = true;
      }
    }
    return isError;
  }

  handleResetForm = () => {
    this.props.history.push('/user/settings');
  }

  handleSubmitForm = () => {
    if(this.checkErrors()) {
      return;
    }
    const token = this.props.token;
    const { oldPassword, password, confirmPassword } = this.state;
    const pswdData = { oldPassword, password, confirmPassword  };
    this.props.updatePswd(token, pswdData);
  }


  render() {
    const { oldPassword, password, confirmPassword, errors } = this.state;
    const { isSending } = this.props;
    const { handleSubmitForm, handleResetForm, handleChangeInputValue } = this;

    return ( 
      <div className={styles.root}>
        <Form
          onSubmit={handleSubmitForm}
          resetForm={handleResetForm}
        >
          <div className={styles.field}>
            <InputField 
              onChange={e => handleChangeInputValue(e, 'oldPassword')} 
              type="password"
              autoComplete="true"
              value={oldPassword}
              placeholder='Old password'
              isError={errors.oldPassword}
            />
          </div>

          <div className={styles.field}>
            <InputField 
              onChange={e => handleChangeInputValue(e, 'password')} 
              type="password"
              autoComplete="true"
              value={password}
              placeholder="New password"
              isError={errors.password}
            />
          </div>
  
          <div className={styles.field}>
            <InputField 
              onChange={e => handleChangeInputValue(e, 'confirmPassword')} 
              type="password"
              autoComplete="true"
              value={confirmPassword}
              placeholder="Confirm new password"
              isError={errors.confirmPassword}
            />
          </div>
          <div className={styles.btns}>
            <div className={styles.btn}>
              <ButtonLink 
                to='/user/settings'
                title="Cancel"
                disabled={isSending}
              />
            </div>
            <div className={styles.btn}>
              <Button
                variants={['tertiary']}
                disabled={isSending}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
     );
  }
}

UpdatePswd.propTypes = {
  token: PropTypes.string,
  isSending: PropTypes.bool,
  updatePswd: PropTypes.func.isRequired,
  resetUpdatePswdForm: PropTypes.func.isRequired,
};
 
export default UpdatePswd;