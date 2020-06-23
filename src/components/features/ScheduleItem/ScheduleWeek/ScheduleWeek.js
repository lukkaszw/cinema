import React from 'react';
import { MemoIconButton } from '../../../common/IconButton/IconButton';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import ScheduleDay from '../ScheduleDay/ScheduleDay';
import PropTypes from 'prop-types';
import styles from './ScheduleWeek.module.scss';

export const ScheduleWeek = ({ days, getPrev, getNext, prevDisabled, nextDisabled }) => {
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
        <MemoIconButton 
          action={getPrev}
          icon={faLongArrowAltLeft} 
          disabled={prevDisabled}
          ariaLabel='Go to previous'
        />
        <MemoIconButton 
          action={getNext}
          icon={faLongArrowAltRight} 
          disabled={nextDisabled}
          ariaLabel='Go to next'
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
 
export default React.memo(ScheduleWeek);