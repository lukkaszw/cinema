import React from 'react';
import IconButton from '../../../common/IconButton/IconButton';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import ScheduleDay from '../ScheduleDay/ScheduleDay';
import PropTypes from 'prop-types';
import styles from './ScheduleWeek.module.scss';

const ScheduleWeek = ({ days, getPrev, getNext, prevDisabled, nextDisabled }) => {
  return ( 
    <div className={styles.root}>
      <ul className={styles.dayList}>
          {
            days.map(day => (
              <ScheduleDay key={day.dayNr} {...day} />
            ))
          }
      </ul>
      <div className={styles.buttons}>
        <IconButton 
          action={getPrev}
          icon={faLongArrowAltLeft} 
          disabled={prevDisabled}
        />
        <IconButton 
          action={getNext}
          icon={faLongArrowAltRight} 
          disabled={nextDisabled}
        />
      </div>
    </div>
   );
}

ScheduleWeek.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPrev: PropTypes.func,
  getNext: PropTypes.func,
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
}
 
export default ScheduleWeek;