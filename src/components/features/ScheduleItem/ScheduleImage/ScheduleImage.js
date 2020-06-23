import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleImage.module.scss';

const ScheduleImage = ({ img, title }) => {
  return ( 
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={img} alt={title} />
      </div>
    </div>
   );
}

ScheduleImage.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
};
 
export default React.memo(ScheduleImage);