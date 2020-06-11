import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderContent.module.scss';

const OrderContent = ({ title, children }) => {
  return ( 
    <div className={styles.root}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <div className={styles.content}>
        {children}
      </div>
    </div>
   );
}
 
OrderContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default OrderContent;