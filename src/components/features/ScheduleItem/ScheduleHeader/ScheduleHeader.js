import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleHeader.module.scss';

const ScheduleHeader = ({ title, duration, categories, rate}) => {
  return ( 
    <div className={styles.root}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.descr}>
          {`${duration} min`}
          <span className={styles.separator}>|</span>
          {categories.join(' ').toUpperCase()}
        </p>
      </div>
      <div className={styles.rate}>
        {`IMDB ${rate}`}
      </div>
    </div>
   );
}

ScheduleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  rate: PropTypes.number.isRequired,
};
 
export default ScheduleHeader;