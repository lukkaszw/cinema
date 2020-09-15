import React from 'react';
import Form from '../../../common/Form/Form.container';
import InputField from '../../../common/InputField/InputField';
import Checkbox from '../../../common/Checkbox/Checkbox';
import RodoWarning from '../../../common/RodoWarning/RodoWarning';
import Button from '../../../common/Button/Button';
import PropTypes from 'prop-types';
import styles from './UserDetailsForm.module.scss';

const UserDetailsForm = ({
  handleSubmitForm, handleResetForm, 
  handleChangeInputValue, handleGetsNewsletter,
  email, name, surname, phone, getsNewsletter, data,
  isSending, errors,
  isEditing, handleCancelEditMode, 
}) => {
  return ( 
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
      { 
        isEditing && 
          <RodoWarning 
            additionalENG="Only email address is stored in database so please provide some nonexistent email address!"
            additionalPL="Tylko adres email jest przechowywany w bazie danych więc proszę o użycie nieistniejącego adresu!"
          />
      }
    </Form>
   );
}

UserDetailsForm.propTypes = {
  handleSubmitForm: PropTypes.func.isRequired, 
  handleResetForm: PropTypes.func.isRequired, 
  handleChangeInputValue: PropTypes.func.isRequired, 
  handleGetsNewsletter: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired, 
  surname: PropTypes.string.isRequired, 
  phone: PropTypes.string.isRequired, 
  getsNewsletter: PropTypes.bool.isRequired, 
  data: PropTypes.object.isRequired,
  isSending: PropTypes.bool.isRequired, 
  errors: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired, 
  handleCancelEditMode: PropTypes.func.isRequired, 
};
 
export default UserDetailsForm;