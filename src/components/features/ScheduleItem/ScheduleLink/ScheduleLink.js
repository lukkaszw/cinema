import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ScheduleLink.module.scss';
import clsx from 'clsx';
import { MS_BEFORE_ORDER, getHoursMsNow, getHoursMsFromString } from '../../../../utils/getDate/getDate';

const ScheduleLink = ({ showId, hour, isToday, isBefore }) => {
  const isInactive = useMemo(() => {
    if(isBefore) return true;
    if(isToday) {
      const hoursNowInMs = getHoursMsNow();
      const showHourInMs = getHoursMsFromString(hour);
      if(hoursNowInMs > (showHourInMs - MS_BEFORE_ORDER)) {
        return true;
      }
    }
    return false;
  }, [hour, isBefore, isToday]);

  return ( 
    <li className={clsx([styles.root, isInactive && styles.inactive])}>
      <Link className={styles.showLink} to={`/schedule/${showId}`}>{hour}</Link>
    </li>
   );
}

ScheduleLink.propTypes = {
  showId: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired,
};
 
export default ScheduleLink;