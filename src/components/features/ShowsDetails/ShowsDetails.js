import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShowsDetails.module.scss';
import clsx from 'clsx';

const ShowsDetails = ({ title, img, date, hour, hall, technology, price }) => {

  return ( 
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={img} alt={title} />
      </div>
      <div className={styles.detailsWrapper}>
        <div className={styles.details}>
          <span className={styles.item}>{date.date}</span>
          <span className={styles.item}>{date.dayOfWeek}</span>
          <span className={styles.item}>{hour}</span>
          <span className={styles.item}><span className={styles.hall}>hall:</span> {hall}</span>
        </div>
        <h3 className={clsx([styles.technology, technology === '3d' && styles._3d])}>{technology}</h3>
        <h3 className={styles.price}>{price}$</h3>
      </div>
    </div>
   );
}

ShowsDetails.propTypes = {
  title: PropTypes.string.isRequired, 
  img: PropTypes.string.isRequired, 
  date: PropTypes.objectOf(PropTypes.string),
  hour: PropTypes.string.isRequired, 
  hall: PropTypes.number.isRequired, 
  technology: PropTypes.string.isRequired, 
  price: PropTypes.number.isRequired
};
 
export default ShowsDetails;