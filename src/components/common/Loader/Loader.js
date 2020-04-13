import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Loader.module.scss';


const Loader = ({ classes }) => { 

  return (
    <div className={clsx([styles.root, ...classes.map(c => styles[c])])}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div> 
  );
};

Loader.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
};

Loader.defaultProps = {
  classes: [],
};
 
export default Loader;