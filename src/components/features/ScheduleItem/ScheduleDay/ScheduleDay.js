import React from 'react';
import ScheduleLink from '../ScheduleLink/ScheduleLink';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ScheduleDay.module.scss';


const ScheduleDay = ({ inWeek, day, dayNr, month, isToday, shows, isBefore }) => {

  return ( 
    <li key={inWeek} className={clsx([styles.root, isToday && styles.active])}>
      <div className={styles.top}>
        <span className={styles.name}>{day}</span>
        <span className={styles.dayNr}>{dayNr}</span>
        <span className={styles.month}>{month}</span>
      </div>
      <ul className={styles.bottom}>
        {
          shows.map(show => (
            <ScheduleLink 
              key={show._id}
              showId={show._id}
              hour={show.startAt}
              isBefore={isBefore}
              isToday={isToday}
            />
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