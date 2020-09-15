import React from 'react';
import styles from './RodoWarning.module.scss';

const RodoWarning = () => {
  return ( 
    <div className={styles.root}>
      <p >
        Warning!!! This app is only for development purposes! Personal data won't be stored in any real database and won't be used in personal data processing!
      </p>
      <p >
        Uwaga!!! Aplikacja stworzona tylko dla potrzeb nauki programowania! Dane osobowe nie będą przechowywane w żadnej bazie danych i nie będą użyte w procesie przetwarzania danych!
      </p>
    </div>
  );
}
 
export default RodoWarning;