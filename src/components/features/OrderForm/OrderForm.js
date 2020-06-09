import React from 'react';
import InputField from '../../common/InputField/InputField';
import PropTypes from 'prop-types';
import styles from './OrderForm.module.scss';

const OrderForm = ({ name, surname, phone, email, handleChangeInputValue, errors }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.field}>
        <InputField 
          placeholder="Your name"
          value={name}
          onChange={(e) => handleChangeInputValue(e, 'name')}
          isError={errors['name']}
        />
      </div>
      <div className={styles.field}>
        <InputField 
          placeholder="Your surname"
          value={surname}
          onChange={(e) => handleChangeInputValue(e, 'surname')}
          isError={errors['surname']}
        />
      </div>
      <div className={styles.field}>
        <InputField 
           placeholder="Your phone"
           value={phone}
           onChange={e => handleChangeInputValue(e, 'phone')}
           isError={errors['phone']}
        />
      </div>
      <div className={styles.field}>
        <InputField 
           placeholder="Your email"
           value={email}
           onChange={e => handleChangeInputValue(e, 'email')}
           isError={errors['email']}
        />
      </div>
      <p className={styles.field}>
        All details required!
      </p>
    </div>
   );
}

OrderForm.propTypes = {
  name: PropTypes.string.isRequired, 
  surname: PropTypes.string.isRequired, 
  phone: PropTypes.string.isRequired, 
  email: PropTypes.string.isRequired, 
  handleChangeInputValue: PropTypes.func.isRequired, 
  errors: PropTypes.object.isRequired,
};
 
export default OrderForm;