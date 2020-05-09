import React from 'react';
import ScheduleItem from '../ScheduleItem/ScheduleItem';
import PropTypes from 'prop-types';
import styles from './ScheduleList.module.scss';

const ScheduleList = ({ movies }) => {
  return ( 
    <ul className={styles.root}>
      {
        movies.map(movie => (
          <li 
            key={movie._id}
            className={styles.item}
          >
            <ScheduleItem {...movie} />
          </li>
        ))
      }
    </ul>
   );
}

ScheduleList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
 
export default ScheduleList;