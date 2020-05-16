import React from 'react';
import Map from '../Map/Map';
import ContactData from './ContactData/ContactData';
import ContactForm from '../ContactForm/ContactForm.container';
import styles from './Contact.module.scss';

const Contact = () => {

  return ( 
    <div className={styles.root}>
      <div className={styles.info}>
        <ContactData />
        <ContactForm />
      </div>
      <div className={styles.map}>
        <Map />
      </div>
    </div>
   );
}
 
export default Contact;