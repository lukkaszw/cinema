import React from 'react';
import styles from './FetchError.module.scss';

const FetchError = () => ( 
  <h3 className={styles.root}>
    Loading data error! We're working to fix it. Please try again later.
  </h3>
);

 
export default FetchError;