import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleImage.module.scss';

const ScheduleImage = ({ img, title }) => {
  const smallImg = img.replace('/images/schedule', '/images/schedule/small');

  return ( 
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img  
          className={styles.image} 
          src={img} 
          alt={title}
        />
        <img 
          className={styles.smallImg}
          src={smallImg}
          alt={title}
        />
      </div>
    </div>
   );
}

ScheduleImage.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
};
 
export default React.memo(ScheduleImage);