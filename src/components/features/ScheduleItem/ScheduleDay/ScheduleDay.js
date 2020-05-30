import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ScheduleDay.module.scss';


const ScheduleDay = ({ inWeek, day, dayNr, month, isToday, shows, isBefore }) => {

  return ( 
    <li key={inWeek} className={clsx([styles.root, isToday && styles.active, isBefore && styles.before])}>
      <div className={styles.top}>
        <span className={styles.name}>{day}</span>
        <span className={styles.dayNr}>{dayNr}</span>
        <span className={styles.month}>{month}</span>
      </div>
      <ul className={styles.bottom}>
        {
          shows.map(show => (
            <li key={show._id} className={styles.showsItem}>
              <Link className={styles.showLink} to={`/schedule/${show._id}`}>{show.startAt}</Link>
            </li>
          ))
        }
      </ul>
    </li>
   );
}

ScheduleDay.propTypes = {
  day: PropTypes.string.isRequired,
  dayNr: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  isToday: PropTypes.bool,
  isBefore: PropTypes.bool,
  shows: PropTypes.arrayOf(PropTypes.object),
};

ScheduleDay.defaultProps = {
  shows: [],
}
 
export default ScheduleDay;