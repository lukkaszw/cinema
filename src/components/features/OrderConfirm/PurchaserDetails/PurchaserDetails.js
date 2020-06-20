import React from 'react';
import PropTypes from 'prop-types';
import styles from './PurchaserDetails.module.scss';

const PurchaserDetails = ({ name, surname, phone, email}) => {
  return ( 
    <div className={styles.root}>
      <h3 className={styles.category}>Purchaser:</h3>
      <p className={styles.value}><strong>{name} {surname}</strong></p>
      <h3 className={styles.category}>Contact details:</h3>
      <p className={styles.value}>
        tel: 
        <strong className={styles.contactItem}>{phone}</strong> 
      </p>
      <p className={styles.value}>
        email: 
        <strong className={styles.contactItem}>{email}</strong>
      </p>
    </div>
   );
}

PurchaserDetails.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
 
export default PurchaserDetails;