import React from 'react';
import styles from './ContactData.module.scss';

const ContactData = () => {
  return ( 
    <div>
      <h3 className={styles.title}>Gold Cinema</h3>
      <p className={styles.contactItem}>ul. Testowa  6/77</p>
      <p className={styles.contactItem}>00-100 Warszawa</p>
      <p className={styles.contactItem}>email: testowy@gmail.com</p>
      <p className={styles.contactItem}>
        tel. 
        <a 
          className={styles.phone}
          href={'tel:666666666'}
        >
          666 666 666
        </a>
      </p>
    </div>
   );
}
 
export default ContactData;