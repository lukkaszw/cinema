import React, { Component } from 'react';
import UserDetailsForm from './UserDetailsForm/UserDetailsForm';
import Button from '../../common/Button/Button';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import PropTypes from 'prop-types';
import styles from './UserSettings.module.scss';
import _v from 'validator';


class UserSettings extends Component {
  state = { 
    email: '',
    name: '',
    surname: '',
    phone: '',
    getsNewsletter: false,
    isFullfillFromProps: false,
    isEditing: false,
    errors: {
      email: false,
      name: false,
      surname: false,
      phone: false,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(!state.isFullfillFromProps && props.data.email) {
      return ({
        email: props.data.email,
        name: props.data.name || '',
        surname: props.data.surname || '',
        phone: props.data.phone || '',
        getsNewsletter: props.data.getsNewsletter || false,
        isFullfillFromProps: true,
        isEditing: false,
        errors: {
          email: false,
          name: false,
          surname: false,
          phone: false,
        }
      });
    }
    return null;
  }

  componentWillUnmount() {
    this.props.resetUpdateForm();
  }

  validate = {
    email: value => _v.isEmail(value),
    name: value => value.trim().length > 1,
    surname: value => value.trim().length > 1,
    phone: value => /^(\+48\s+)?\d{3}(\s*|-)\d{3}(\s*|-)\d{3}$/.test(value) || /^(\+48\s*)?\d{2}\s*\d{3}(\s*|-)\d{2}(\s*|-)\d{2}$/.test(value),
  };

  handleChangeInputValue = (e, key) => {
    const value = e.target.value;
    this.setState(prevState => ({
      [key]: value,
      errors: {
        ...prevState.errors,
        [key]: !this.validate[key](value),
      }
    }));
  }

  handleGetsNewsletter = () => {
    this.setState(prevState => ({
      getsNewsletter: !prevState.getsNewsletter,
    }))
  }
 
  handleStartEditMode = () => {
    this.setState({
      isEditing: true,
    })
  }

  handleCancelEditMode = (e) => {
    e.preventDefault();
    this.setState({
      isEditing: false,
      errors: {
        email: false,
        name: false,
        surname: false,
        phone: false,
      }
    });
  }

  checkErrors = () => {
    const possibleErrors = this.state.errors;
    let isError = false;
    Object.keys(possibleErrors).forEach(key => {
      if(possibleErrors[key]) {
        isError = true;
        return;
      }
    });
    return isError;
  }

  handleSubmitForm = () => {
    if(this.checkErrors()) {
      return;
    }

    const token = this.props.token;
    const { email, name, surname, phone, getsNewsletter } = this.state;

    const userData = { email, name, surname, phone, getsNewsletter };
    this.props.updateUserData(token, userData);
  }

  handleResetForm = () => {
    this.props.resetUpdateForm();
    this.setState({
      isFullfillFromProps: false,
    });
  }

  render() { 
    const { email, name, surname, phone, getsNewsletter, isEditing, errors } = this.state;
    const { data, isSending } = this.props;
    const { 
      handleChangeInputValue,
      handleGetsNewsletter,
      handleStartEditMode,
      handleCancelEditMode,
      handleResetForm,
      handleSubmitForm } = this;

    return ( 
      <div className={styles.root}>
        <UserDetailsForm 
          handleSubmitForm={handleSubmitForm}
          handleResetForm={handleResetForm}
          handleChangeInputValue={handleChangeInputValue} 
          handleGetsNewsletter={handleGetsNewsletter}
          handleCancelEditMode={handleCancelEditMode}
          email={email} 
          name={name}
          surname={surname}
          phone={phone}
          getsNewsletter={getsNewsletter}
          data={data}
          isSending={isSending}
          errors={errors}
          isEditing={isEditing}  
        />
        {
          !isEditing &&
            <div className={styles.editBtn}>
              <Button
                action={handleStartEditMode}
                variants={['small', 'secondary']}
              >
                Edit
              </Button>
            </div>
        }
        {
          !isEditing &&
              <div className={styles.btns}>
                <div className={styles.btn}>
                  <ButtonLink
                    to="/user/settings/up"
                    size="small"
                    variant="fourth"
                    title="Update password!"
                  />
                </div>
                <div className={styles.btn}>
                  <ButtonLink
                    to="/user/settings/delete"
                    size="small"
                    title="Delete account"
                  />
                </div>
              </div>
        }
      </div>
     );
  }
}

UserSettings.propTypes = {
  token: PropTypes.string,
  updateUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  resetUpdateForm: PropTypes.func.isRequired,
};
 
export default UserSettings;