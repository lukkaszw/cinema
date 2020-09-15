import React from 'react';
import PropTypes from 'prop-types';
import styles from './RodoWarning.module.scss';

const RodoWarning = ({ additionalENG, additionalPL }) => {
  return ( 
    <div className={styles.root}>
      <p >
        Warning!!! This app is only for development purposes! Personal data won't be stored in any real database and won't be used in personal data processing! {additionalENG}
      </p>
      <p >
        Uwaga!!! Aplikacja stworzona tylko dla potrzeb nauki programowania! Dane osobowe nie będą przechowywane w żadnej bazie danych i nie będą użyte w procesie przetwarzania danych! {additionalPL}
      </p>
    </div>
  );
}

RodoWarning.propTypes = {
  additionalENG: PropTypes.string,
  additionalPL: PropTypes.string,
};
 
export default RodoWarning;