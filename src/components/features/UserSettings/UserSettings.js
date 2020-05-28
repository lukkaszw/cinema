import React, { Component } from 'react';
import InputField from '../../common/InputField/InputField';
import Checkbox from '../../common/Checkbox/Checkbox';
import Form from '../../common/Form/Form.container';
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
    phone: value => /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/.test(value),
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
        <Form 
          onSubmit={handleSubmitForm}
          resetForm={handleResetForm}
        >
          <div className={styles.field}>
            <label htmlFor='email'>Email:</label> 
            <InputField 
              id="email" 
              value={isEditing ? email : data.email || 'not provided'}
              onChange={(e) => handleChangeInputValue(e, 'email')}
              isPassive={!isEditing}
              disabled={!isEditing}
              isError={errors.email}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='name'>Name:</label> 
            <InputField 
              id="name" 
              value={isEditing ? name : data.name || 'not provided'}
              onChange={(e) => handleChangeInputValue(e, 'name')}
              isPassive={!isEditing}
              disabled={!isEditing}
              isError={errors.name}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='surname'>Surname:</label> 
            <InputField 
              id="surname" 
              value={isEditing ? surname : data.surname || 'not provided'}
              onChange={(e) => handleChangeInputValue(e, 'surname')}
              isPassive={!isEditing}
              disabled={!isEditing}
              isError={errors.surname}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor='phone'>Phone:</label> 
            <InputField 
              id="phone" 
              value={isEditing ? phone : data.phone || 'not provided'}
              onChange={(e) => handleChangeInputValue(e, 'phone')}
              isPassive={!isEditing}
              disabled={!isEditing}
              isError={errors.phone}
            />
          </div>
          <div className={styles.checkbox}>
            <Checkbox 
              value="newsletter"
              toggleAction={handleGetsNewsletter}
              checked={getsNewsletter}
              text="I want to receive newsletters"
              isPassive={!isEditing}
              disabled={!isEditing}
            />
          </div>
          {
            isEditing &&
              <div className={styles.formBtns}>
                <div className={styles.formBtn}>
                  <Button
                    action={handleCancelEditMode}
                    disabled={isSending}
                  >
                    Cancel
                  </Button>
                </div>
                <div className={styles.formBtn}>
                  <Button
                    variants={['tertiary']}
                    disabled={isSending}
                  >
                    Submit
                  </Button>
                </div>
              </div>
          }
        </Form>
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
            <div className={styles.upBtn}>
              <ButtonLink
                to="/user/settings/up"
                size="small"
                title="Update password!"
              />
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